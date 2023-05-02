module Main exposing (main)

import Browser
import Browser.Events exposing (onResize)
import Browser.Dom exposing (getViewport, Viewport)
import Html exposing (Html)
import Html.Attributes exposing (height, width, style)
import Html.Events as HE
import Json.Decode as Decode exposing (Decoder)
import Task

import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 exposing (Vec3, vec3)
import OBJ
import OBJ.Types exposing (MeshWith, Vertex)
import WebGL exposing (Shader, Entity)
import WebGL.Settings
import WebGL.Settings.DepthTest as DepthTest

type Msg
    = LoadMesh (Result String (MeshWith Vertex))
    | MouseDown (Float, Float)
    | MouseMove (Float, Float)
    | MouseUp (Float, Float)
    | Wheel (Float, Float)
    | GetViewport Viewport
    | Resize Float Float

type alias CameraModel =
    { azimuth: Float
    , altitude: Float
    , zoom: Float
    , previousPoint: Maybe (Float, Float) 
    }

type DraggingState
    = Panning (Float, Float)
    | Rotating (Float, Float)


type alias Model = 
    { mesh : Result String (MeshWith Vertex)
    , viewport :
        { width: Float
        , height: Float
        }
    , camera : CameraModel
    , log : String
    }


main : Program () Model Msg
main =
    Browser.element
        { init = always (initModel, initCmd)
        , view = view
        , subscriptions = subscriptions
        , update = update
        }


initModel : Model
initModel =
    { mesh = Err "loading..."
    , viewport = { width = 0, height = 0 }
    , camera =
        { azimuth = degrees (-90)
        , altitude = degrees 90
        , zoom = 1.0
        , previousPoint = Nothing
        }
    , log = ""
    }


initCmd : Cmd Msg
initCmd =
    Cmd.batch 
        [ Task.perform GetViewport getViewport
        , OBJ.loadMeshWithoutTexture "http://localhost:8080/slope.obj" LoadMesh
        ]


view : Model -> Html Msg
view model =
    Html.div []
    [ WebGL.toHtmlWith
        [
          WebGL.alpha True
        , WebGL.antialias
        , WebGL.depth 1
        , WebGL.clearColor 0.9 0.9 1.0 1
        ]
        [ width (round model.viewport.width)
        , height (round model.viewport.height)
        , style "display" "block"
        , style "width" (String.fromFloat (model.viewport.width / 2) ++ "px")
        , style "height" (String.fromFloat (model.viewport.height / 2) ++ "px")
        , onMouseUpHandler model
        , onMouseMoveHandler model
        , onMouseDownHandler model
        , onMouseLeaveHandler model
        , onWheelHandler model
        ]
        (case model.mesh of
          Ok m -> [showMesh model m]
          Err _ -> []
        )
    , Html.textarea [] [ Html.text 
      (case model.mesh of
        Err e -> e
        Ok _ -> "SUCCESS: mesh loaded"
      )]
    , Html.text model.log
    ]


showMesh : Model -> MeshWith Vertex -> Entity
showMesh model { vertices, indices } =
    WebGL.entityWith
        [
          DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.front
        ]
        railVertexShader
        railFragmentShader
        (WebGL.indexedTriangles vertices indices)
        (uniforms model)


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        LoadMesh mesh -> ({ model | mesh = mesh}, Cmd.none)
        MouseDown pos -> ({ model | camera = updateMouseDown model.camera pos }, Cmd.none)
        MouseMove pos -> ({ model | camera = updateMouseMove model.camera pos }, Cmd.none)
        MouseUp pos -> ({ model | camera = updateMouseUp model.camera pos }, Cmd.none)
        Wheel pos -> ({ model | camera = updateWheel model.camera pos }, Cmd.none)
        GetViewport viewport ->
            (updateViewport viewport.viewport.width
                            viewport.viewport.height
                            model
            , Cmd.none)
        Resize width height -> (updateViewport width height model, Cmd.none)

updateViewport : Float -> Float -> Model -> Model
updateViewport w h model = 
    { model | viewport = { width = 2 * w, height = 2 * h - 200 } }

updateMouseDown : CameraModel -> (Float, Float) -> CameraModel
updateMouseDown cameraModel pos = 
    { cameraModel | previousPoint = Just pos }

updateMouseMove : CameraModel -> (Float, Float) -> CameraModel
updateMouseMove cameraModel (x, y) =
    case cameraModel.previousPoint of
        Nothing -> cameraModel
        Just (px, py) ->
            let
                dx = x - px
                dy = y - py
                azimuth = cameraModel.azimuth - dx * degrees 0.3
                altitude = cameraModel.altitude + dy * degrees 0.3
                         |> clamp (degrees 0) (degrees 90)
            in
                { cameraModel | previousPoint = Just (x, y)
                              , azimuth = azimuth
                              , altitude = altitude
                }

updateMouseUp : CameraModel ->  (Float, Float) -> CameraModel
updateMouseUp cameraModel _ =
    { cameraModel | previousPoint = Nothing }

updateWheel : CameraModel ->  (Float, Float) -> CameraModel
updateWheel cameraModel (_, dy) =
    let
        multiplier = 1.03125

        delta =
            if dy > 0 then -- zoom out
                1 / multiplier
            else if dy < 0 then -- zoom in
                1 * multiplier
            else
                1
    in
        { cameraModel | zoom = cameraModel.zoom * delta }


mouseEventDecoder : Decoder (Float, Float)
mouseEventDecoder =
    Decode.map2 Tuple.pair
        (Decode.field "clientX" Decode.float)
        (Decode.field "clientY" Decode.float)

wheelEventDecoder : Decoder (Float, Float)
wheelEventDecoder =
    Decode.map2 Tuple.pair
        (Decode.field "deltaX" Decode.float)
        (Decode.field "deltaY" Decode.float)

preventDefaultDecoder : Decoder a -> Decoder (a, Bool)
preventDefaultDecoder = Decode.map (\a -> (a, True))


onMouseUpHandler : Model -> Html.Attribute Msg
onMouseUpHandler _ =
    HE.on "mouseup" (Decode.map MouseUp mouseEventDecoder)


-- Since this is a toy program, always handle mouse move event!
onMouseMoveHandler : Model -> Html.Attribute Msg
onMouseMoveHandler _ =
    HE.on "mousemove" (Decode.map MouseMove mouseEventDecoder)


onMouseDownHandler : Model -> Html.Attribute Msg
onMouseDownHandler _ =
    HE.on "mousedown" (Decode.map MouseDown mouseEventDecoder)

onMouseLeaveHandler : Model -> Html.Attribute Msg
onMouseLeaveHandler _ =
    HE.on "mouseleave" (Decode.map MouseUp mouseEventDecoder)

onWheelHandler : Model -> Html.Attribute Msg
onWheelHandler _ =
    HE.preventDefaultOn "wheel"
        (Decode.map Wheel wheelEventDecoder |> preventDefaultDecoder)


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ onResize (\w h -> Resize (toFloat w) (toFloat h))
        ]

type alias Uniforms =
    { perspective : Mat4
    , camera : Mat4
    , transform : Vec3
    }


uniforms : Model -> Uniforms
uniforms model =
    { perspective = makeOrtho model.viewport model.camera.zoom
    , camera = makeLookAt model.camera
    , transform = vec3 0 0 0
    }


makeOrtho : { width: Float, height: Float } -> Float -> Mat4
makeOrtho { width, height } zoom =
    let
        w = width / zoom / 2
        h = height / zoom / 2
    in
        Mat4.makeOrtho (-w) w (-h) h 0.1 10000

makeLookAt : CameraModel -> Mat4
makeLookAt model =
    let
        distance = 1000
        x =
            distance * cos model.altitude * cos model.azimuth 
        y =
            distance * sin model.altitude
        z =
            distance * cos model.altitude * -(sin model.azimuth)
    in
        Mat4.makeLookAt (vec3 x y z) (vec3 0 0 0) (vec3 0 1 0)

railVertexShader : Shader Vertex Uniforms { contrast: Float }
railVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 perspective;
        uniform mat4 camera;
        uniform vec3 transform;
        
        varying highp float contrast;
        
        void main() {
            gl_Position = perspective * camera * vec4(position, 1.0) + vec4(transform, 0.0);
            contrast = 0.3 + 0.7 * normal[1] * normal[1]; // XZ face should be blue
        }
    |]

  
railFragmentShader : Shader {} Uniforms { contrast: Float }
railFragmentShader =
    [glsl|
        varying highp float contrast;
        
        void main() {
            gl_FragColor = vec4(contrast * vec3(0.12, 0.56, 1.0), 1.0);
        }
    |]
