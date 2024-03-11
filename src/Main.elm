module Main exposing (main)

import Browser
import Browser.Dom exposing (Viewport)
import Browser.Events
import Dict
import Forth
import Graphics.MeshLoader as MeshLoader exposing (Mesh)
import Graphics.MeshWithScalingVector as SV
import Graphics.OrbitControl as OC
import Html exposing (Html, div)
import Html.Attributes as HA exposing (autocomplete, spellcheck, style)
import Html.Events as HE
import Json.Decode as Decode exposing (Decoder)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 exposing (Vec3, vec3)
import Math.Vector4 exposing (Vec4, vec4)
import Storage
import Task
import Types.Pier exposing (Pier)
import Types.PierPlacement exposing (PierPlacement)
import Types.RailPlacement exposing (RailPlacement)
import WebGL exposing (Entity, Shader)
import WebGL.Settings
import WebGL.Settings.DepthTest
import WebGL.Settings.StencilTest


type Msg
    = LoadMesh MeshLoader.Msg
    | MouseDown ( Float, Float )
      -- Shift だけ特別扱いするというのが漏れてるのでどうにかしたい
    | MouseDownWithShift ( Float, Float )
    | MouseMove ( Float, Float )
    | MouseUp ( Float, Float )
    | Wheel ( Float, Float )
    | SetViewport Viewport
    | Resize Float Float
    | UpdateScript String
    | SplitBarBeginDrag ( Float, Float )
    | SplitBarUpdateDrag ( Float, Float )
    | SplitBarEndDrag ( Float, Float )


type alias Model =
    { meshes : MeshLoader.Model
    , viewport :
        { width : Float
        , height : Float
        }
    , orbitControl : OC.Model
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


document : Model -> Browser.Document Msg
document model =
    { title = "Railforth prototype"
    , body = [ view model ]
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        execResult =
            Forth.execute flags.program
    in
    ( { meshes = MeshLoader.init
      , viewport = { width = 0, height = 0 }
      , orbitControl = OC.init (degrees 0) (degrees 90) 1 (vec3 0 0 0)
      , program = flags.program
      , rails = execResult.rails
      , piers = execResult.piers
      , errMsg = execResult.errMsg -- Just <| formatRailCount execResult.railCount
      , splitBarDragState = Nothing
      , splitBarPosition = 1100.0
      }
    , Cmd.batch
        [ Task.perform SetViewport Browser.Dom.getViewport
        , MeshLoader.loadMeshCmd LoadMesh
        ]
    )


formatRailCount : Dict.Dict String Int -> String
formatRailCount dict =
    -- TODO: HTMLElementを返す方が望ましいかもしれない
    -- TODO: なんらかのUIでレールの数を常に表示するようにする
    Dict.foldl (\name count accum -> accum ++ "\n" ++ name ++ ": " ++ String.fromInt count) "" dict
        ++ "\nTotal: "
        ++ String.fromInt (Dict.foldl (\_ count accum -> count + accum) 0 dict)


px : Float -> String
px x =
    String.fromFloat x ++ "px"


view : Model -> Html Msg
view model =
    -- TODO: もう少し分離する
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
        [ viewCanvas
            { width = model.viewport.width
            , height = model.splitBarPosition
            , top = 0
            , left = 0
            , onMouseDown = onMouseDownHandler model
            , onMouseUp = onMouseUpHandler model
            , onWheel = onWheelHandler model
            , rails = model.rails
            , piers = model.piers
            , meshes = model.meshes
            , transform = OC.makeTransform model.orbitControl
            }
        , Html.pre
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
            , style "font-size" "1rem"
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


viewCanvas :
    { left : Float
    , top : Float
    , width : Float
    , height : Float
    , onMouseDown : Html.Attribute msg
    , onMouseUp : Html.Attribute msg
    , onWheel : Html.Attribute msg
    , meshes : MeshLoader.Model
    , rails : List RailPlacement
    , piers : List PierPlacement
    , transform : Mat4
    }
    -> Html msg
viewCanvas { left, top, width, height, onMouseDown, onMouseUp, onWheel, meshes, rails, piers, transform } =
    WebGL.toHtmlWith
        [ WebGL.alpha True
        , WebGL.antialias
        , WebGL.depth 1
        , WebGL.stencil 0
        , WebGL.clearColor 1.0 1.0 1.0 1.0
        ]
        [ HA.width (round (2.0 * width))
        , HA.height (round (2.0 * height))
        , HA.style "display" "block"
        , HA.style "position" "absolute"
        , HA.style "left" (left |> px)
        , HA.style "top" (top |> px)
        , HA.style "width" (width |> px)
        , HA.style "height" (height |> px)
        , onMouseDown
        , onMouseUp
        , onWheel
        ]
    <|
        List.concat
            [ showRails meshes rails transform
            , showPiers meshes piers transform
            ]


showRails : MeshLoader.Model -> List RailPlacement -> Mat4 -> List Entity
showRails meshes rails transform =
    List.concatMap
        (\railPosition ->
            showRail
                Mat4.identity
                transform
                (MeshLoader.getRailMesh meshes railPosition.rail)
                railPosition.position
                railPosition.angle
        )
        rails


lightFromAbove : Vec3
lightFromAbove =
    vec3 (2.0 / 27.0) (26.0 / 27.0) (7.0 / 27.0)


showRail : Mat4 -> Mat4 -> Mesh -> Vec3 -> Float -> List Entity
showRail projectionTransform viewTransform mesh origin angle =
    let
        modelTransform =
            makeMeshMatrix origin angle
    in
    [ -- 輪郭をくりぬいた中身のマスクをステンシルバッファにのみ書き込む。
      WebGL.entityWith
        [ WebGL.Settings.DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.back

        --        , WebGL.Settings.colorMask False False False False
        , WebGL.Settings.StencilTest.test
            { ref = 1
            , mask = 0xFF
            , writeMask = 0xFF
            , test = WebGL.Settings.StencilTest.always
            , fail = WebGL.Settings.StencilTest.keep
            , zfail = WebGL.Settings.StencilTest.keep
            , zpass = WebGL.Settings.StencilTest.replace
            }
        ]
        outlineVertexShader
        outlineFragmentShader
        mesh
        { projectionTransform = projectionTransform
        , viewTransform = viewTransform
        , modelTransform = modelTransform
        , color = vec4 0.0 1.0 0.5 1.0
        , light = lightFromAbove
        , scalingFactor = -1.7
        }
    , -- 輪郭線の部分を書き込む。cullFace frontでやるので裏を描く感じ。ステンシルバッファは変更しない
      WebGL.entityWith
        [ WebGL.Settings.DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.front
        ]
        outlineVertexShader
        outlineFragmentShader
        mesh
        { projectionTransform = projectionTransform
        , viewTransform = viewTransform
        , modelTransform = modelTransform
        , color = vec4 0.2 0.2 0.2 1.0
        , light = lightFromAbove
        , scalingFactor = 0.0
        }

    -- , -- テスト。ステンシルバッファが1のときにベタ塗りする
    --   WebGL.entityWith
    --     [ WebGL.Settings.DepthTest.always { write = True, near = 0, far = 1 }
    --     , WebGL.Settings.cullFace WebGL.Settings.back
    --     , WebGL.Settings.StencilTest.test
    --         { ref = 1
    --         , mask = 0xFF
    --         , writeMask = 0xFF
    --         , test = WebGL.Settings.StencilTest.equal
    --         , fail = WebGL.Settings.StencilTest.keep
    --         , zfail = WebGL.Settings.StencilTest.keep
    --         , zpass = WebGL.Settings.StencilTest.decrementWrap
    --         }
    --     ]
    --     outlineVertexShader
    --     outlineFragmentShader
    --     mesh
    --     { projectionTransform = projectionTransform
    --     , viewTransform = viewTransform
    --     , modelTransform = modelTransform
    --     , color = vec4 0.5 0.5 0.2 1.0
    --     , scalingFactor = 0
    --     }
    -- レール本体を描画する。この際に最初のマスクの部分のみに対して描画を行う
    -- , WebGL.entityWith
    --     [ WebGL.Settings.DepthTest.always { write = True, near = 0.0, far = 1.0 }
    --     , WebGL.Settings.cullFace WebGL.Settings.back
    --     , WebGL.Settings.StencilTest.test
    --         { ref = 1
    --         , mask = 0xFF
    --         , writeMask = 0xFF
    --         , test = WebGL.Settings.StencilTest.equal
    --         , fail = WebGL.Settings.StencilTest.keep
    --         , zfail = WebGL.Settings.StencilTest.keep
    --         , zpass = WebGL.Settings.StencilTest.decrementWrap
    --         }
    --     ]
    --     railVertexShader
    --     railFragmentShader
    --     mesh
    --     { projectionTransform = projectionTransform
    --     , viewTransform = viewTransform
    --     , modelTransform = modelTransform
    --     , light = lightFromAbove
    --     }
    ]


showPiers : MeshLoader.Model -> List PierPlacement -> Mat4 -> List Entity
showPiers meshes piers transform =
    List.map
        (\pierPlacement ->
            showPier
                Mat4.identity
                -- identityはOCで MとVを計算することにしたので、ここがいらなくなったので仮で置いている。取り除いていい
                transform
                (MeshLoader.getPierMesh meshes pierPlacement.pier)
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
            ( { model | meshes = MeshLoader.update meshMsg model.meshes }, Cmd.none )

        MouseDown pos ->
            ( { model | orbitControl = OC.updateMouseDown model.orbitControl pos }, Cmd.none )

        MouseMove pos ->
            ( { model | orbitControl = OC.updateMouseMove model.orbitControl pos }, Cmd.none )

        MouseUp pos ->
            ( { model | orbitControl = OC.updateMouseUp model.orbitControl pos }, Cmd.none )

        MouseDownWithShift pos ->
            ( { model | orbitControl = OC.updateMouseDownWithShift model.orbitControl pos }, Cmd.none )

        Wheel pos ->
            ( { model | orbitControl = OC.updateWheel model.orbitControl pos }, Cmd.none )

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
                    Forth.execute program
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
    { model
        | viewport = { width = w, height = h }
        , orbitControl = OC.updateViewport w h model.orbitControl
        , splitBarPosition = clamp 10 (h - 10) (h * 0.8)
    }


mouseEventDecoder : Decoder ( Float, Float )
mouseEventDecoder =
    Decode.map2 (\x y -> ( x, y ))
        (Decode.field "clientX" Decode.float)
        (Decode.field "clientY" Decode.float)


mouseEventDecoderWithModifier : (( Float, Float ) -> msg) -> (( Float, Float ) -> msg) -> Decoder msg
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
        Decode.map MouseUp mouseEventDecoder


onSplitBarDragBegin : Model -> Html.Attribute Msg
onSplitBarDragBegin _ =
    HE.on "mousedown" <|
        Decode.map SplitBarBeginDrag mouseEventDecoder


onMouseMoveHandler : Model -> Html.Attribute Msg
onMouseMoveHandler _ =
    HE.on "mousemove" <|
        Decode.map MouseMove mouseEventDecoder


onMouseDownHandler : Model -> Html.Attribute Msg
onMouseDownHandler _ =
    HE.preventDefaultOn "mousedown" <|
        preventDefaultDecoder <|
            mouseEventDecoderWithModifier MouseDown MouseDownWithShift


onWheelHandler : Model -> Html.Attribute Msg
onWheelHandler _ =
    HE.preventDefaultOn "wheel"
        (Decode.map Wheel wheelEventDecoder |> preventDefaultDecoder)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Browser.Events.onResize (\w h -> Resize (toFloat w) (toFloat h))
        , subscriptionMouseEvent model
        , subscriptionSplitBar model
        ]


subscriptionMouseEvent : Model -> Sub Msg
subscriptionMouseEvent model =
    if OC.isDragging model.orbitControl then
        Sub.batch
            [ Browser.Events.onMouseMove <| Decode.map MouseMove mouseEventDecoder
            , Browser.Events.onMouseUp <| Decode.map MouseUp mouseEventDecoder
            ]

    else
        Sub.none


subscriptionSplitBar : Model -> Sub Msg
subscriptionSplitBar model =
    -- なぜsubscriptionに埋め込んだかを思い出せないけれど、たしかちゃんとした理由があったはず。
    -- そういうのはちゃんとコメントに書いた方がいいぞい
    case model.splitBarDragState of
        Just _ ->
            Sub.batch
                [ Browser.Events.onMouseMove <| Decode.map SplitBarUpdateDrag mouseEventDecoder
                , Browser.Events.onMouseUp <| Decode.map SplitBarEndDrag mouseEventDecoder
                ]

        Nothing ->
            Sub.none


type alias Uniforms =
    { modelTransform : Mat4
    , viewTransform : Mat4
    , projectionTransform : Mat4
    , light : Vec3
    }


type alias OutlineUniforms =
    { modelTransform : Mat4
    , viewTransform : Mat4
    , projectionTransform : Mat4
    , scalingFactor : Float
    , light : Vec3
    , color : Vec4
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


railVertexShader : Shader SV.VertexWithScalingVector Uniforms { edge : Float, color : Vec3 }
railVertexShader =
    -- シェーダ周り、というか描画周りはモジュールに分けてしまいたい
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec3 scalingVector;
        
        uniform mat4 modelTransform;
        uniform mat4 viewTransform;
        uniform mat4 projectionTransform;
        uniform vec3 light;
        
        varying highp float edge;
        varying highp vec3 color;

        void main() {
            highp vec4 worldPosition = modelTransform * vec4(position - 1.0 * scalingVector, 1.0);
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


outlineVertexShader : Shader SV.VertexWithScalingVector OutlineUniforms { vertexColor : Vec4 }
outlineVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec3 scalingVector;
        
        uniform mat4 modelTransform;
        uniform mat4 viewTransform;
        uniform mat4 projectionTransform;
        uniform highp float scalingFactor;
        uniform highp vec4 color;
        uniform highp vec3 light;

        varying highp vec4 vertexColor;


        void main() {
            highp vec4 worldPosition = modelTransform * vec4(position + scalingFactor * scalingVector, 1.0);
            highp vec4 worldNormal = normalize(modelTransform * vec4(normal, 0.0));

            highp float lambertFactor = dot(worldNormal, vec4(light, 0));
            highp float intensity = 0.3 + 0.7 * lambertFactor;
            vertexColor = intensity * color;

            gl_Position = projectionTransform * viewTransform * worldPosition;
        }
    |]


outlineFragmentShader : Shader {} OutlineUniforms { vertexColor : Vec4 }
outlineFragmentShader =
    [glsl|
        varying highp vec4 vertexColor;
        void main() {
            gl_FragColor = vertexColor;
        }
    |]


pierVertexShader : Shader SV.VertexWithScalingVector Uniforms { color : Vec3 }
pierVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec3 scalingVector;
        
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
