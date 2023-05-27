module Main exposing (main)

import Browser
import Browser.Dom exposing (Viewport)
import Browser.Events
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
import Touch
import WebGL exposing (Entity, Shader)
import WebGL.Settings
import WebGL.Settings.DepthTest


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
    | OnTouchRotate Float Float
    | OnTouchMove Float Float
    | OnTouchPinch Float
    | TouchEvent Touch.Msg


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
    , touchModel : Touch.Model Msg
    , draggingState : Maybe DraggingState
    , program : String
    , rails : List RailPlacement
    , piers : List PierPlacement
    , errMsg : Maybe String
    , splitBarDragState : Maybe ( Float, Float )
    , splitBarPosition : Float
    }


type alias Flags =
    { program : String
    }


main : Program Flags Model Msg
main =
    Browser.document
        { init = init
        , view = document
        , subscriptions = subscriptions
        , update = update
        }


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        execResult =
            Interpreter.execute flags.program
    in
    ( { meshes = Mesh.init
      , viewport = { width = 0, height = 0 }
      , azimuth = degrees 0
      , altitude = degrees 90
      , pixelPerUnit = 100
      , target = vec3 500 0 -1000
      , draggingState = Nothing
      , touchModel =
            Touch.initModel
                [ Touch.onMove { fingers = 1 } OnTouchRotate
                , Touch.onMove { fingers = 2 } OnTouchMove
                , Touch.onPinch OnTouchPinch
                ]
      , program = flags.program
      , rails = execResult.rails
      , piers = execResult.piers
      , errMsg = execResult.errMsg
      , splitBarDragState = Nothing
      , splitBarPosition = 1100.0
      }
    , Cmd.batch
        [ Task.perform SetViewport Browser.Dom.getViewport
        , Mesh.loadMeshCmd LoadMesh
        ]
    )


document : Model -> Browser.Document Msg
document model =
    { title = "Railforth prototype"
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
            ]
          <|
            showRails model model.rails
                ++ showPiers model model.piers
        , Touch.element
            [ style "display" "block"
            , style "position" "absolute"
            , style "left" (px 0)
            , style "top" (px railViewTop)
            , style "width" (px model.viewport.width)
            , style "height" (px railViewHeight)
            , style "z-index" "10"
            , onMouseUpHandler model
            , onMouseMoveHandler model
            , onMouseDownHandler model
            , onWheelHandler model
            ]
            TouchEvent
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
            , style "touch-action" "none"
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
            , style "touch-action" "none"
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
            , style "touch-action" "pan-x pan-y"
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


lightFromAbove : Vec3
lightFromAbove =
    vec3 (2.0 / 27.0) (26.0 / 27.0) (7.0 / 27.0)


showRail : Mat4 -> Mat4 -> Mesh -> Vec3 -> Float -> Entity
showRail projectionTransform viewTransform mesh origin angle =
    let
        modelTransform =
            makeMeshMatrix origin angle
    in
    WebGL.entityWith
        [ WebGL.Settings.DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.front
        ]
        railVertexShader
        railFragmentShader
        mesh
        { projectionTransform = projectionTransform
        , viewTransform = viewTransform
        , modelTransform = modelTransform
        , light = lightFromAbove
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
        [ WebGL.Settings.DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.front
        ]
        pierVertexShader
        pierFragmentShader
        mesh
        { projectionTransform = projectionTransform
        , viewTransform = viewTransform
        , modelTransform = modelTransform
        , light = lightFromAbove
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

        OnTouchRotate x y ->
            ( doRotation model model.draggingState ( 0, 0 ) ( x, y ), Cmd.none )

        OnTouchMove x y ->
            ( doPanning model model.draggingState ( 0, 0 ) ( x, y ), Cmd.none )

        OnTouchPinch r ->
            ( doDolly model r, Cmd.none )

        TouchEvent touchMsg ->
            Touch.update touchMsg
                model.touchModel
                (\newTouchModel -> { model | touchModel = newTouchModel })


updateViewport : Float -> Float -> Model -> Model
updateViewport w h model =
    { model
        | viewport = { width = w, height = h }
        , splitBarPosition = clamp 10 (h - 10) (h * 0.8)
    }


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
            doRotation model (Just <| Rotating newPoint) oldPoint newPoint

        Just (Panning oldPoint) ->
            doPanning model (Just <| Panning newPoint) oldPoint newPoint


doRotation : Model -> Maybe DraggingState -> ( Float, Float ) -> ( Float, Float ) -> Model
doRotation model newState ( x0, y0 ) ( x, y ) =
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
        | draggingState = newState
        , azimuth = azimuth
        , altitude = altitude
    }


updateMouseUp : Model -> ( Float, Float ) -> Model
updateMouseUp model _ =
    { model | draggingState = Nothing }


updateWheel : Model -> ( Float, Float ) -> Model
updateWheel model ( _, dy ) =
    doDolly model dy


doDolly : Model -> Float -> Model
doDolly model dy =
    let
        multiplier =
            1.02

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
        [ Browser.Events.onResize (\w h -> Resize (toFloat w) (toFloat h))
        , subscriptionPan model
        , subscriptionRotate model
        , subscriptionSplitBar model
        ]


subscriptionPan : Model -> Sub Msg
subscriptionPan model =
    case model.draggingState of
        Just (Panning _) ->
            Sub.batch
                [ Browser.Events.onMouseMove <| Decode.map UpdatePan mouseEventDecoder
                , Browser.Events.onMouseUp <| Decode.map EndPan mouseEventDecoder
                ]

        _ ->
            Sub.none


subscriptionRotate : Model -> Sub Msg
subscriptionRotate model =
    case model.draggingState of
        Just (Panning _) ->
            Sub.batch
                [ Browser.Events.onMouseMove <| Decode.map UpdateRotate mouseEventDecoder
                , Browser.Events.onMouseUp <| Decode.map EndRotate mouseEventDecoder
                ]

        _ ->
            Sub.none


subscriptionSplitBar : Model -> Sub Msg
subscriptionSplitBar model =
    case model.splitBarDragState of
        Just _ ->
            Sub.batch
                [ Browser.Events.onMouseMove <| Decode.map SplitBarUpdateDrag mouseEventDecoder
                , Browser.Events.onMouseUp <| Decode.map SplitBarEndDrag mouseEventDecoder
                ]

        Nothing ->
            Sub.none


doPanning : Model -> Maybe DraggingState -> ( Float, Float ) -> ( Float, Float ) -> Model
doPanning model newState ( x0, y0 ) ( x, y ) =
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
        | draggingState = newState
        , target = trans
    }


type alias Uniforms =
    { modelTransform : Mat4
    , viewTransform : Mat4
    , projectionTransform : Mat4
    , light : Vec3
    }


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


railVertexShader : Shader Vertex Uniforms { edge : Float, color : Vec3 }
railVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 modelTransform;
        uniform mat4 viewTransform;
        uniform mat4 projectionTransform;
        uniform vec3 light;
        
        varying highp float edge;
        varying highp vec3 color;

        void main() {
            highp vec4 worldPosition = modelTransform * vec4(position, 1.0);
            highp vec4 worldNormal = normalize(modelTransform * vec4(normal, 0.0));

            // blue to green ratio. 0 <--- blue   green ---> 1.0
            highp float ratio = clamp(worldPosition[1] / 660.0, 0.0, 1.0);

            const highp vec3 blue = vec3(0.12, 0.56, 1.0);
            const highp vec3 green = vec3(0.12, 1.0, 0.56);

            highp float lambertFactor = dot(worldNormal, vec4(light, 0));
            highp float intensity = 0.3 + 0.7 * lambertFactor;
            color = intensity * (ratio * green + (1.0 - ratio) * blue);

            edge = distance(vec3(0.0, 0.0, 0.0), position);

            gl_Position = projectionTransform * viewTransform * worldPosition;
        }
    |]


railFragmentShader : Shader {} Uniforms { edge : Float, color : Vec3 }
railFragmentShader =
    [glsl|
        varying highp float edge;
        varying highp vec3 color;

        void main() {
            highp float dist_density = min(edge / 30.0 + 0.2, 1.0);
            gl_FragColor = vec4(color, dist_density);
        }
    |]


pierVertexShader : Shader Vertex Uniforms { color : Vec3 }
pierVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 modelTransform;
        uniform mat4 viewTransform;
        uniform mat4 projectionTransform;
        uniform vec3 light;

        varying highp vec3 color;

        void main() {
            highp vec4 worldPosition = modelTransform * vec4(position, 1.0);
            highp vec4 worldNormal = normalize(modelTransform * vec4(normal, 0.0));

            const highp vec3 yellow = vec3(1.0, 1.0, 0.3);
            highp float lambertFactor = dot(worldNormal, vec4(light, 0));
            highp float intensity = 0.5 + 0.5 * lambertFactor;
            color = intensity * yellow;

            gl_Position = projectionTransform * viewTransform * worldPosition;
        }
    |]


pierFragmentShader : Shader {} Uniforms { color : Vec3 }
pierFragmentShader =
    [glsl|
        varying highp vec3 color;

        void main() {
            gl_FragColor = vec4(color, 1.0);
        }
    |]
