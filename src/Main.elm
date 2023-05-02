module Main exposing (main)

import Browser
import Browser.Dom exposing (Viewport, getViewport)
import Browser.Events as BE exposing (onResize)
import Dict exposing (Dict)
import Html exposing (Html, div)
import Html.Attributes exposing (height, spellcheck, style, width)
import Html.Events as HE
import Json.Decode as Decode exposing (Decoder)
import Kind exposing (Kind)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Mesh
import OBJ.Types exposing (MeshWith, Vertex)
import Rail exposing (Rail)
import Rot45 exposing (Rot45)
import Task
import Tie exposing (Tie)
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
    , panOffset : Vec3
    , draggingState : Maybe DraggingState
    , program : String
    , rails : List Rail
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


document : Model -> Browser.Document Msg
document model =
    { title = "visrail"
    , body = [ view model ]
    }


initModel : Model
initModel =
    { meshes = Mesh.init
    , viewport = { width = 0, height = 0 }
    , azimuth = degrees -90
    , altitude = degrees 80
    , pixelPerUnit = 100
    , panOffset = vec3 0 0 0
    , draggingState = Nothing
    , program = ""
    , rails = []
    , splitBarDragState = Nothing
    , splitBarPosition = 500.0
    }


initCmd : Cmd Msg
initCmd =
    Cmd.batch
        [ Task.perform SetViewport getViewport
        , Mesh.loadMeshCmd LoadMesh
        ]


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
            , HE.onInput UpdateScript
            ]
            [ Html.text model.program
            ]
        ]


showRails : Model -> List Rail -> List Entity
showRails model rails =
    List.map
        (\rail ->
            showMesh
                model
                (Mesh.getMesh model.meshes rail.kind)
                rail.origin
        )
        Rail.test1


originToVec3 : Tie -> Vec3
originToVec3 tie =
    let
        ( sx, sy ) =
            tie.single |> Rot45.toFloat

        ( dx, dy ) =
            tie.double |> Rot45.toFloat

        h =
            tie.height |> Basics.toFloat

        sunit =
            216.0

        dunit =
            270.0

        hunit =
            66.0
    in
    vec3
        (sunit * sx + dunit * dx)
        (hunit * h)
        -(sunit * sy + dunit * dy)


originToRotate : Tie -> Float
originToRotate tie =
    let
        ( x, y ) =
            tie.dir |> Rot45.toFloat
    in
    Basics.atan2 y x


showMesh : Model -> MeshWith Vertex -> Tie -> Entity
showMesh model { vertices, indices } origin =
    WebGL.entityWith
        [ DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.front
        ]
        railVertexShader
        railFragmentShader
        (WebGL.indexedTriangles vertices indices)
        (uniforms model (originToVec3 origin) (originToRotate origin))


compile : String -> List Rail
compile program =
    Rail.test1


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
            ( { model
                | program = program
                , rails = compile program
              }
            , Cmd.none
            )

        SplitBarBeginDrag pos ->
            ( { model | splitBarDragState = Just pos }, Cmd.none )

        SplitBarUpdateDrag ( _, y ) ->
            ( { model | splitBarPosition = clamp 100 1000 y }, Cmd.none )

        SplitBarEndDrag _ ->
            ( { model | splitBarDragState = Nothing }, Cmd.none )


updateLoadMesh :
    String
    -> Result String (MeshWith Vertex)
    -> Dict String (MeshWith Vertex)
    -> Dict String (MeshWith Vertex)
updateLoadMesh name meshOrErr dict =
    case meshOrErr of
        Err _ ->
            dict

        Ok mesh ->
            Dict.insert name mesh dict


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



-- Since this is a toy program, always handle mouse move event!


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
        [ onResize (\w h -> Resize (toFloat w) (toFloat h))
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

        trans =
            Vec3.add model.panOffset (vec3 (os * dx) (os * dy) 0)
    in
    { model
        | draggingState = Just (Panning ( x, y ))
        , panOffset = Debug.log "panOffset" trans
    }


type alias Uniforms =
    { transform : Mat4
    }


uniforms : Model -> Vec3 -> Float -> Uniforms
uniforms model origin rotate =
    { transform =
        Mat4.mul (makeTransform model) (makeMeshMatrix origin rotate)
    }


makeTransform : Model -> Mat4
makeTransform model =
    let
        railViewport =
            { width = model.viewport.width
            , height = model.splitBarPosition
            }

        ortho =
            makeOrtho railViewport model.pixelPerUnit

        pan =
            Mat4.makeTranslate model.panOffset

        camera =
            makeLookAt model
    in
    List.foldr Mat4.mul
        Mat4.identity
        [ ortho
        , pan
        , camera
        ]


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


makeOrtho : { width : Float, height : Float } -> Float -> Mat4
makeOrtho { width, height } ppu =
    let
        w =
            orthoScale ppu * width / 2

        h =
            orthoScale ppu * height / 2
    in
    Mat4.makeOrtho -w w -h h -100000 100000


makeLookAt : Model -> Mat4
makeLookAt model =
    let
        distance =
            10000

        x =
            distance * cos model.altitude * cos model.azimuth

        y =
            distance * sin model.altitude

        z =
            distance * cos model.altitude * -(sin model.azimuth)
    in
    Mat4.makeLookAt (vec3 x y z) (vec3 0 0 0) (vec3 0 1 0)


railVertexShader : Shader Vertex Uniforms { contrast : Float }
railVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 transform;
        
        varying highp float contrast;
        
        void main() {
            gl_Position = transform * vec4(position, 1.0);
            contrast = 0.3 + 0.7 * normal[1] * normal[1]; // XZ face should be blue
        }
    |]


railFragmentShader : Shader {} Uniforms { contrast : Float }
railFragmentShader =
    [glsl|
        varying highp float contrast;
        
        void main() {
            gl_FragColor = vec4(contrast * vec3(0.12, 0.56, 1.0), 1.0);
        }
    |]
