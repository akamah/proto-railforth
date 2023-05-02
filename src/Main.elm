module Main exposing (main)

import Browser
import Browser.Dom exposing (Viewport, getViewport)
import Browser.Events exposing (onResize)
import Dict exposing (Dict)
import Html exposing (Html, div)
import Html.Attributes exposing (height, spellcheck, style, width)
import Html.Events as HE
import Json.Decode as Decode exposing (Decoder)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import OBJ
import OBJ.Types exposing (MeshWith, Vertex)
import Rail exposing (Rail)
import Task
import Tie exposing (Tie)
import WebGL exposing (Entity, Shader)
import WebGL.Settings
import WebGL.Settings.DepthTest as DepthTest


type Msg
    = LoadMesh String (Result String (MeshWith Vertex))
    | MouseDown ( Float, Float )
    | MouseDownWithShift ( Float, Float )
    | MouseMove ( Float, Float )
    | MouseUp ( Float, Float )
    | Wheel ( Float, Float )
    | GetViewport Viewport
    | Resize Float Float
    | UpdateScript String


type alias CameraModel =
    { azimuth : Float
    , altitude : Float
    , pixelPerUnit : Float
    , translate : Vec3
    , draggingState : Maybe DraggingState
    }


type DraggingState
    = Panning ( Float, Float )
    | Rotating ( Float, Float )


type alias Model =
    { meshes : Dict String (MeshWith Vertex)
    , viewport :
        { width : Float
        , height : Float
        }
    , camera : CameraModel
    , program : String
    , rails : List Rail
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
    { title = "Visrail"
    , body = [ view model ]
    }


initModel : Model
initModel =
    { meshes = Dict.empty
    , viewport = { width = 0, height = 0 }
    , camera = initCamera
    , program = ""
    , rails = []
    }


initCamera : CameraModel
initCamera =
    { azimuth = degrees -90
    , altitude = degrees 80
    , pixelPerUnit = 100
    , translate = vec3 0 0 0
    , draggingState = Nothing
    }


initCmd : Cmd Msg
initCmd =
    Cmd.batch
        [ Task.perform GetViewport getViewport
        , loadMesh "straight_1"
        , loadMesh "cross"
        , loadMesh "auto_point"
        ]


loadMesh : String -> Cmd Msg
loadMesh name =
    OBJ.loadMeshWithoutTexture (buildMeshUri name) (LoadMesh name)


buildMeshUri : String -> String
buildMeshUri name =
    "http://localhost:8080/" ++ name ++ ".obj"


view : Model -> Html Msg
view model =
    div []
        [ WebGL.toHtmlWith
            [ WebGL.alpha True
            , WebGL.antialias
            , WebGL.depth 1
            , WebGL.clearColor 0.9 0.9 1.0 1
            ]
            [ width (round (2.0 * model.viewport.width))
            , height (round model.viewport.height)
            , style "display" "block"
            , style "width" (String.fromFloat model.viewport.width ++ "px")
            , style "height" (String.fromFloat (model.viewport.height / 2) ++ "px")
            , onMouseUpHandler model
            , onMouseMoveHandler model
            , onMouseDownHandler model
            , onMouseLeaveHandler model
            , onWheelHandler model
            ]
            (showRails model model.rails)
        , Html.textarea
            [ style "resize" "none"
            , style "width" (String.fromFloat (model.viewport.width - 8) ++ "px")
            , style "height" (String.fromFloat (model.viewport.height / 2 - 40) ++ "px")
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
    []



{-
   List.concatMap
       (\rail ->
           case Dict.get "straight_1" model.meshes of
               Just mesh ->
                   [showMesh model mesh rail.origin]
               Nothing ->
                   [])
       rails
-}


showMesh : Model -> MeshWith Vertex -> Vec3 -> Entity
showMesh model { vertices, indices } origin =
    WebGL.entityWith
        [ DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.front
        ]
        railVertexShader
        railFragmentShader
        (WebGL.indexedTriangles vertices indices)
        (uniforms model origin)


simple : Float -> List String -> List Rail
simple current commands =
    []


compile : String -> List Rail
compile program =
    simple 0.0 <| String.words program



{- [ ("straight_1", vec3 0 0 0)
   , ("straight_1", vec3 0 0 60)
   , ("straight_1", vec3 0 50 60)
   , ("cross", vec3 216 0 0)
   , ("auto_point", vec3 -324 0 0)
   ]
-}


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadMesh name mesh ->
            ( { model | meshes = updateLoadMesh name mesh model.meshes }, Cmd.none )

        MouseDown pos ->
            ( { model | camera = updateMouseDown model.camera pos }, Cmd.none )

        MouseDownWithShift pos ->
            ( { model | camera = updateMouseDownWithShift model.camera pos }, Cmd.none )

        MouseMove pos ->
            ( { model | camera = updateMouseMove model.camera pos }, Cmd.none )

        MouseUp pos ->
            ( { model | camera = updateMouseUp model.camera pos }, Cmd.none )

        Wheel pos ->
            ( { model | camera = updateWheel model.camera pos }, Cmd.none )

        GetViewport viewport ->
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


updateLoadMesh : String -> Result String (MeshWith Vertex) -> Dict String (MeshWith Vertex) -> Dict String (MeshWith Vertex)
updateLoadMesh name meshOrErr dict =
    case meshOrErr of
        Err _ ->
            dict

        Ok mesh ->
            Dict.insert name mesh dict


updateViewport : Float -> Float -> Model -> Model
updateViewport w h model =
    { model | viewport = { width = w, height = h } }


updateMouseDown : CameraModel -> ( Float, Float ) -> CameraModel
updateMouseDown cameraModel pos =
    { cameraModel | draggingState = Just (Rotating pos) }


updateMouseDownWithShift : CameraModel -> ( Float, Float ) -> CameraModel
updateMouseDownWithShift cameraModel pos =
    { cameraModel | draggingState = Just (Panning pos) }


updateMouseMove : CameraModel -> ( Float, Float ) -> CameraModel
updateMouseMove cameraModel newPoint =
    case cameraModel.draggingState of
        Nothing ->
            cameraModel

        Just (Rotating oldPoint) ->
            doRotation cameraModel oldPoint newPoint

        Just (Panning oldPoint) ->
            doPanning cameraModel oldPoint newPoint


doRotation : CameraModel -> ( Float, Float ) -> ( Float, Float ) -> CameraModel
doRotation cameraModel ( px, py ) ( x, y ) =
    let
        dx =
            x - px

        dy =
            y - py

        azimuth =
            cameraModel.azimuth - dx * degrees 0.3

        altitude =
            cameraModel.altitude
                - dy
                * degrees 0.3
                |> clamp (degrees 0) (degrees 90)
    in
    { cameraModel
        | draggingState = Just (Rotating ( x, y ))
        , azimuth = azimuth
        , altitude = altitude
    }


doPanning : CameraModel -> ( Float, Float ) -> ( Float, Float ) -> CameraModel
doPanning cameraModel ( px, py ) ( x, y ) =
    let
        dx =
            x - px

        dy =
            y - py

        trans =
            Vec3.add cameraModel.translate (vec3 dx dy 0)
    in
    { cameraModel
        | draggingState = Just (Panning ( x, y ))
        , translate = trans
    }


updateMouseUp : CameraModel -> ( Float, Float ) -> CameraModel
updateMouseUp cameraModel _ =
    { cameraModel | draggingState = Nothing }


updateWheel : CameraModel -> ( Float, Float ) -> CameraModel
updateWheel cameraModel ( _, dy ) =
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
            cameraModel.pixelPerUnit
                * delta
                |> clamp 20 1000
    in
    { cameraModel | pixelPerUnit = next }


type alias PointToMsg msg =
    ( Float, Float ) -> msg


mouseEventDecoder : Decoder ( Float, Float )
mouseEventDecoder =
    Decode.map2 (\x y -> ( x, -y ))
        (Decode.field "clientX" Decode.float)
        (Decode.field "clientY" Decode.float)


mouseEventDecoderWithModifier : PointToMsg msg -> PointToMsg msg -> Decoder msg
mouseEventDecoderWithModifier normal shift =
    Decode.map2
        (\point shiftPressed ->
            if shiftPressed then
                shift point

            else
                normal point
        )
        mouseEventDecoder
        (Decode.field "shiftKey" Decode.bool)


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
        Decode.map MouseUp mouseEventDecoder



-- Since this is a toy program, always handle mouse move event!


onMouseMoveHandler : Model -> Html.Attribute Msg
onMouseMoveHandler _ =
    HE.on "mousemove" <|
        Decode.map MouseMove mouseEventDecoder


onMouseDownHandler : Model -> Html.Attribute Msg
onMouseDownHandler _ =
    HE.on "mousedown" <|
        mouseEventDecoderWithModifier MouseDown MouseDownWithShift


onMouseLeaveHandler : Model -> Html.Attribute Msg
onMouseLeaveHandler _ =
    HE.on "mouseleave" <|
        Decode.map MouseUp mouseEventDecoder


onWheelHandler : Model -> Html.Attribute Msg
onWheelHandler _ =
    HE.preventDefaultOn "wheel"
        (Decode.map Wheel wheelEventDecoder |> preventDefaultDecoder)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ onResize (\w h -> Resize (toFloat w) (toFloat h))
        ]


type alias Uniforms =
    { transform : Mat4
    , origin : Vec3
    }


uniforms : Model -> Vec3 -> Uniforms
uniforms model origin =
    { transform = makeTransform model
    , origin = origin
    }


makeTransform : Model -> Mat4
makeTransform model =
    let
        ortho =
            makeOrtho model.viewport model.camera.pixelPerUnit

        camera =
            makeLookAt model.camera

        translate =
            makeTranslate model.camera
    in
    Mat4.mul ortho <|
        Mat4.mul translate camera


makeOrtho : { width : Float, height : Float } -> Float -> Mat4
makeOrtho { width, height } ppu =
    let
        unit =
            216 / ppu

        w =
            unit * width / 2

        h =
            unit * height / 4
    in
    Mat4.makeOrtho -w w -h h -100000 100000


makeLookAt : CameraModel -> Mat4
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


makeTranslate : CameraModel -> Mat4
makeTranslate model =
    let
        scale =
            2 * 216 / model.pixelPerUnit
    in
    Mat4.makeTranslate (Vec3.scale scale model.translate)


railVertexShader : Shader Vertex Uniforms { contrast : Float }
railVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 transform;
        uniform vec3 origin;
        
        varying highp float contrast;
        
        void main() {
            gl_Position = transform * vec4(position + origin, 1.0);
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
