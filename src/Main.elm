module Main exposing (main)

import Browser
import Browser.Dom exposing (Viewport, getViewport)
import Browser.Events as BE exposing (onResize)
import Forth.Interpreter as Interpreter
import Graphics.Mesh as Mesh exposing (Mesh)
import Html exposing (Html, div)
import Html.Attributes exposing (autocomplete, height, spellcheck, style, width)
import Html.Events as HE
import Json.Decode as Decode exposing (Decoder)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import OBJ.Types exposing (Vertex)
import PierPlacement exposing (PierPlacement)
import RailPlacement exposing (RailPlacement)
import Storage
import Task
import WebGL exposing (Entity, Shader)
import WebGL.Settings
import WebGL.Settings.DepthTest as DepthTest


type Msg
    = LoadMesh Mesh.Msg
    | BeginPan ( Float, Float )
    | UpdatePan ( Float, Float )
    | EndPan ( Float, Float )
    | BeginRotate ( Float, Float )
    | UpdateRotate ( Float, Float )
    | EndRotate ( Float, Float )
    | Wheel ( Float, Float )
    | SetViewport Viewport
    | Resize Float Float
    | UpdateScript String
    | SplitBarBeginDrag ( Float, Float )
    | SplitBarUpdateDrag ( Float, Float )
    | SplitBarEndDrag ( Float, Float )


type DraggingState
    = Panning ( Float, Float )
    | Rotating ( Float, Float )


type alias Model =
    { meshes : Mesh.Model
    , viewport :
        { width : Float
        , height : Float
        }
    , azimuth : Float
    , altitude : Float
    , pixelPerUnit : Float
    , target : Vec3
    , draggingState : Maybe DraggingState
    , program : String
    , rails : List RailPlacement
    , piers : List PierPlacement
    , errMsg : Maybe String
    , splitBarDragState : Maybe ( Float, Float )
    , splitBarPosition : Float
    }


main : Program () Model Msg
main =
    Browser.document
        { init = always ( initModel, initCmd )
        , view = document
        , subscriptions = subscriptions
        , update = update
        }


initModel : Model
initModel =
    { meshes = Mesh.init
    , viewport = { width = 0, height = 0 }
    , azimuth = degrees -90
    , altitude = degrees 90
    , pixelPerUnit = 100
    , target = vec3 1000 0 -500
    , draggingState = Nothing
    , program = ""
    , rails = []
    , piers = []
    , errMsg = Nothing
    , splitBarDragState = Nothing
    , splitBarPosition = 1000.0
    }


initCmd : Cmd Msg
initCmd =
    Cmd.batch
        [ Task.perform SetViewport getViewport
        , Mesh.loadMeshCmd LoadMesh
        ]


document : Model -> Browser.Document Msg
document model =
    { title = "RailForth prototype"
    , body = [ view model ]
    }


px : Float -> String
px x =
    String.fromFloat x ++ "px"


view : Model -> Html Msg
view model =
    let
        railViewTop =
            0

        railViewHeight =
            model.splitBarPosition

        barTop =
            model.splitBarPosition

        barHeight =
            8

        editorTop =
            barTop + barHeight

        editorHeight =
            model.viewport.height - editorTop - barHeight
    in
    div []
        [ WebGL.toHtmlWith
            [ WebGL.alpha True
            , WebGL.antialias
            , WebGL.depth 1
            , WebGL.clearColor 1.0 1.0 1.0 1.0
            ]
            [ width (round (2.0 * model.viewport.width))
            , height (round (2.0 * barTop))
            , style "display" "block"
            , style "position" "absolute"
            , style "left" (px 0)
            , style "top" (px railViewTop)
            , style "width" (px model.viewport.width)
            , style "height" (px railViewHeight)
            , onMouseUpHandler model
            , onMouseMoveHandler model
            , onMouseDownHandler model
            , onWheelHandler model
            ]
          <|
            showRails model model.rails
                ++ showPiers model model.piers
        , Html.div
            [ style "display" <|
                if model.errMsg == Nothing then
                    "none"

                else
                    "block"
            , style "position" "absolute"
            , style "left" (px 0)
            , style "top" (px railViewTop)
            , style "width" (px model.viewport.width)
            , style "height" (px railViewHeight)
            , style "font-size" "2rem"
            , style "pointer-events" "none"
            , style "z-index" "100"
            ]
            [ Html.text <| Maybe.withDefault "" <| model.errMsg ]
        , Html.div
            [ style "display" "block"
            , style "position" "absolute"
            , style "left" (px 0)
            , style "top" (px barTop)
            , style "cursor" "row-resize"
            , style "width" (px model.viewport.width)
            , style "height" (px barHeight)
            , style "box-sizing" "border-box"
            , style "background-color" "lightgrey"
            , style "border-style" "outset"
            , style "border-width" "1px"
            , onSplitBarDragBegin model
            ]
            []
        , Html.textarea
            [ style "display" "block"
            , style "position" "absolute"
            , style "resize" "none"
            , style "top" (px editorTop)
            , style "left" (px 0)
            , style "width" (String.fromFloat (model.viewport.width - 8) ++ "px")
            , style "height" (px editorHeight)
            , style "margin" "3px"
            , style "padding" "0"
            , style "border" "solid 1px"
            , style "outline" "none"
            , style "font-family" "monospace"
            , style "font-size" "large"
            , style "box-sizing" "border-box"
            , spellcheck False
            , autocomplete False
            , HE.onInput UpdateScript
            ]
            [ Html.text model.program
            ]
        ]


showRails : Model -> List RailPlacement -> List Entity
showRails model rails =
    let
        projectionTransform =
            makeOrtho model.viewport.width model.splitBarPosition model.pixelPerUnit

        viewTransform =
            makeLookAt model.azimuth model.altitude model.target
    in
    List.map
        (\railPosition ->
            showRail
                projectionTransform
                viewTransform
                (Mesh.getRailMesh model.meshes railPosition.rail)
                railPosition.position
                railPosition.angle
        )
        rails


showRail : Mat4 -> Mat4 -> Mesh -> Vec3 -> Float -> Entity
showRail projectionTransform viewTransform mesh origin angle =
    let
        modelTransform =
            makeMeshMatrix origin angle
    in
    WebGL.entityWith
        [ DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.front
        ]
        railVertexShader
        railFragmentShader
        mesh
        { projectionTransform = projectionTransform
        , viewTransform = viewTransform
        , modelTransform = modelTransform
        }


showPiers : Model -> List PierPlacement -> List Entity
showPiers model piers =
    let
        projectionTransform =
            makeOrtho model.viewport.width model.splitBarPosition model.pixelPerUnit

        viewTransform =
            makeLookAt model.azimuth model.altitude model.target
    in
    List.map
        (\pierPlacement ->
            showPier
                projectionTransform
                viewTransform
                (Mesh.getPierMesh model.meshes pierPlacement.pier)
                pierPlacement.position
                pierPlacement.angle
        )
        piers


showPier : Mat4 -> Mat4 -> Mesh -> Vec3 -> Float -> Entity
showPier projectionTransform viewTransform mesh origin angle =
    let
        modelTransform =
            makeMeshMatrix origin angle
    in
    WebGL.entityWith
        [ DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.front
        ]
        pierVertexShader
        pierFragmentShader
        mesh
        { projectionTransform = projectionTransform
        , viewTransform = viewTransform
        , modelTransform = modelTransform
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadMesh meshMsg ->
            ( { model | meshes = Mesh.update meshMsg model.meshes }, Cmd.none )

        BeginPan pos ->
            ( updateMouseDown model pos, Cmd.none )

        UpdatePan pos ->
            ( updateMouseMove model pos, Cmd.none )

        EndPan pos ->
            ( updateMouseUp model pos, Cmd.none )

        BeginRotate pos ->
            ( updateMouseDownWithShift model pos, Cmd.none )

        UpdateRotate pos ->
            ( updateMouseMove model pos, Cmd.none )

        EndRotate pos ->
            ( updateMouseUp model pos, Cmd.none )

        Wheel pos ->
            ( updateWheel model pos, Cmd.none )

        SetViewport viewport ->
            ( updateViewport viewport.viewport.width
                viewport.viewport.height
                model
            , Cmd.none
            )

        Resize width height ->
            ( updateViewport width height model, Cmd.none )

        UpdateScript program ->
            let
                execResult =
                    Interpreter.execute program
            in
            ( case execResult.errMsg of
                Nothing ->
                    { model
                        | program = program
                        , rails = execResult.rails
                        , piers = execResult.piers
                        , errMsg = Nothing
                    }

                Just errMsg ->
                    { model
                        | program = program
                        , errMsg = Just errMsg
                    }
            , Storage.save program
            )

        SplitBarBeginDrag pos ->
            ( { model | splitBarDragState = Just pos }, Cmd.none )

        SplitBarUpdateDrag ( _, y ) ->
            ( { model | splitBarPosition = clamp 100 1200 y }, Cmd.none )

        SplitBarEndDrag _ ->
            ( { model | splitBarDragState = Nothing }, Cmd.none )


updateViewport : Float -> Float -> Model -> Model
updateViewport w h model =
    { model | viewport = { width = w, height = h } }


updateMouseDown : Model -> ( Float, Float ) -> Model
updateMouseDown model pos =
    { model | draggingState = Just (Rotating pos) }


updateMouseDownWithShift : Model -> ( Float, Float ) -> Model
updateMouseDownWithShift model pos =
    { model | draggingState = Just (Panning pos) }


updateMouseMove : Model -> ( Float, Float ) -> Model
updateMouseMove model newPoint =
    case model.draggingState of
        Nothing ->
            model

        Just (Rotating oldPoint) ->
            doRotation model oldPoint newPoint

        Just (Panning oldPoint) ->
            doPanning model oldPoint newPoint


doRotation : Model -> ( Float, Float ) -> ( Float, Float ) -> Model
doRotation model ( x0, y0 ) ( x, y ) =
    let
        dx =
            x - x0

        dy =
            y - y0

        azimuth =
            model.azimuth - dx * degrees 0.3

        altitude =
            model.altitude
                - dy
                * degrees 0.3
                |> clamp (degrees 0) (degrees 90)
    in
    { model
        | draggingState = Just (Rotating ( x, y ))
        , azimuth = azimuth
        , altitude = altitude
    }


updateMouseUp : Model -> ( Float, Float ) -> Model
updateMouseUp model _ =
    { model | draggingState = Nothing }


updateWheel : Model -> ( Float, Float ) -> Model
updateWheel model ( _, dy ) =
    let
        multiplier =
            1.05

        delta =
            if dy < 0 then
                -- zoom out
                1 / multiplier

            else if dy > 0 then
                -- zoom in
                1 * multiplier

            else
                1

        next =
            model.pixelPerUnit
                * delta
                |> clamp 20 1000
    in
    { model | pixelPerUnit = next }


type alias PointToMsg msg =
    ( Float, Float ) -> msg


mouseEventDecoder : Decoder ( Float, Float )
mouseEventDecoder =
    Decode.map2 (\x y -> ( x, y ))
        (Decode.field "clientX" Decode.float)
        (Decode.field "clientY" Decode.float)


mouseEventDecoderWithModifier : PointToMsg msg -> PointToMsg msg -> Decoder msg
mouseEventDecoderWithModifier normal shift =
    Decode.map2
        (\shiftPressed ->
            if shiftPressed then
                shift

            else
                normal
        )
        (Decode.field "shiftKey" Decode.bool)
        mouseEventDecoder


wheelEventDecoder : Decoder ( Float, Float )
wheelEventDecoder =
    Decode.map2 (\x y -> ( x, -y ))
        (Decode.field "deltaX" Decode.float)
        (Decode.field "deltaY" Decode.float)


preventDefaultDecoder : Decoder a -> Decoder ( a, Bool )
preventDefaultDecoder =
    Decode.map (\a -> ( a, True ))


onMouseUpHandler : Model -> Html.Attribute Msg
onMouseUpHandler _ =
    HE.on "mouseup" <|
        Decode.map EndRotate mouseEventDecoder


onSplitBarDragBegin : Model -> Html.Attribute Msg
onSplitBarDragBegin _ =
    HE.on "mousedown" <|
        Decode.map SplitBarBeginDrag mouseEventDecoder


onMouseMoveHandler : Model -> Html.Attribute Msg
onMouseMoveHandler _ =
    HE.on "mousemove" <|
        Decode.map UpdateRotate mouseEventDecoder


onMouseDownHandler : Model -> Html.Attribute Msg
onMouseDownHandler _ =
    HE.preventDefaultOn "mousedown" <|
        preventDefaultDecoder <|
            mouseEventDecoderWithModifier BeginPan BeginRotate


onWheelHandler : Model -> Html.Attribute Msg
onWheelHandler _ =
    HE.preventDefaultOn "wheel"
        (Decode.map Wheel wheelEventDecoder |> preventDefaultDecoder)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Storage.load UpdateScript
        , onResize (\w h -> Resize (toFloat w) (toFloat h))
        , subscriptionPan model
        , subscriptionRotate model
        , subscriptionSplitBar model
        ]


subscriptionPan : Model -> Sub Msg
subscriptionPan model =
    case model.draggingState of
        Just (Panning _) ->
            Sub.batch
                [ BE.onMouseMove <| Decode.map UpdatePan mouseEventDecoder
                , BE.onMouseUp <| Decode.map EndPan mouseEventDecoder
                ]

        _ ->
            Sub.none


subscriptionRotate : Model -> Sub Msg
subscriptionRotate model =
    case model.draggingState of
        Just (Panning _) ->
            Sub.batch
                [ BE.onMouseMove <| Decode.map UpdateRotate mouseEventDecoder
                , BE.onMouseUp <| Decode.map EndRotate mouseEventDecoder
                ]

        _ ->
            Sub.none


subscriptionSplitBar : Model -> Sub Msg
subscriptionSplitBar model =
    case model.splitBarDragState of
        Just _ ->
            Sub.batch
                [ BE.onMouseMove <| Decode.map SplitBarUpdateDrag mouseEventDecoder
                , BE.onMouseUp <| Decode.map SplitBarEndDrag mouseEventDecoder
                ]

        Nothing ->
            Sub.none


doPanning : Model -> ( Float, Float ) -> ( Float, Float ) -> Model
doPanning model ( x0, y0 ) ( x, y ) =
    let
        dx =
            x - x0

        dy =
            -(y - y0)

        os =
            orthoScale model.pixelPerUnit

        ca =
            cos model.azimuth

        sa =
            sin model.azimuth

        cb =
            cos model.altitude

        sb =
            sin model.altitude

        tanx =
            Vec3.scale (os * dx) (vec3 sa 0 ca)

        tany =
            Vec3.scale (os * dy) (vec3 (ca * sb) -cb -(sa * sb))

        trans =
            Vec3.add model.target (Vec3.add tanx tany)
    in
    { model
        | draggingState = Just (Panning ( x, y ))
        , target = trans
    }


type alias Uniforms =
    { modelTransform : Mat4
    , viewTransform : Mat4
    , projectionTransform : Mat4
    }


makeTransform : Model -> Mat4
makeTransform model =
    let
        ortho =
            makeOrtho model.viewport.width model.splitBarPosition model.pixelPerUnit

        lookat =
            makeLookAt model.azimuth model.altitude model.target
    in
    Mat4.mul ortho lookat


makeMeshMatrix : Vec3 -> Float -> Mat4
makeMeshMatrix origin angle =
    let
        position =
            Mat4.makeTranslate origin

        rotate =
            Mat4.makeRotate angle (vec3 0 1 0)
    in
    Mat4.mul position rotate


orthoScale : Float -> Float
orthoScale ppu =
    216.0 / ppu


makeOrtho : Float -> Float -> Float -> Mat4
makeOrtho width height ppu =
    let
        w =
            orthoScale ppu * width / 2

        h =
            orthoScale ppu * height / 2
    in
    Mat4.makeOrtho -w w -h h -100000 100000


makeLookAt : Float -> Float -> Vec3 -> Mat4
makeLookAt azimuth altitude target =
    let
        distance =
            10000

        x =
            distance * cos altitude * cos azimuth

        y =
            distance * sin altitude

        z =
            distance * cos altitude * -(sin azimuth)
    in
    Mat4.makeLookAt (Vec3.add target (vec3 x y z)) target (vec3 0 1 0)


railVertexShader : Shader Vertex Uniforms { contrast : Float, edge : Float, color : Vec3 }
railVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 modelTransform;
        uniform mat4 viewTransform;
        uniform mat4 projectionTransform;
        
        varying highp float contrast;
        varying highp float edge;
        varying highp vec3 color;

        void main() {
            highp vec4 worldPosition = modelTransform * vec4(position, 1.0);

            // blue to green ratio. 0 <--- blue   green ---> 1.0
            highp float ratio = clamp(worldPosition[1] / 660.0, 0.0, 1.0);
            gl_Position = projectionTransform * viewTransform * worldPosition;

            const highp vec3 blue = vec3(0.12, 0.56, 1.0);
            const highp vec3 green = vec3(0.12, 1.0, 0.56);

            color = ratio * green + (1.0 - ratio) * blue;

            contrast = 0.5 + 0.5 * normal[1] * normal[1]; // XZ face should be blue
            edge = distance(vec3(0.0, 0.0, 0.0), position);
        }
    |]


railFragmentShader : Shader {} Uniforms { contrast : Float, edge : Float, color : Vec3 }
railFragmentShader =
    [glsl|
        varying highp float contrast;
        varying highp float edge;
        varying highp vec3 color;

        void main() {
            highp float dist_density = min(edge / 30.0 + 0.2, 1.0);
            gl_FragColor = vec4(dist_density * contrast * color, dist_density);
        }
    |]


pierVertexShader : Shader Vertex Uniforms {}
pierVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 modelTransform;
        uniform mat4 viewTransform;
        uniform mat4 projectionTransform;
        
        void main() {
            gl_Position = projectionTransform * viewTransform * modelTransform * vec4(position, 1.0);
        }
    |]


pierFragmentShader : Shader {} Uniforms {}
pierFragmentShader =
    [glsl|
        void main() {
            const highp vec3 yellow = vec3(0.9, 0.9, 0.2);
            gl_FragColor = vec4(yellow, 1.0);
        }
    |]
