module Main exposing (main)

import Browser
import Browser.Dom
import Browser.Events
import Dict
import Forth
import Graphics.MeshLoader as MeshLoader
import Graphics.OrbitControl as OC
import Graphics.Render
import Html exposing (Html)
import Html.Attributes as HA exposing (style)
import Html.Events as HE
import Json.Decode as Decode exposing (Decoder)
import Math.Matrix4 exposing (Mat4)
import Math.Vector3 exposing (vec3)
import Storage
import Task
import Types.PierPlacement exposing (PierPlacement)
import Types.RailPlacement exposing (RailPlacement)
import WebGL


type Msg
    = LoadMesh MeshLoader.Msg
    | MouseDown ( Float, Float )
      -- Shift だけ特別扱いするというのが漏れてるのでどうにかしたい
    | MouseDownWithShift ( Float, Float )
    | MouseMove ( Float, Float )
    | MouseUp ( Float, Float )
    | Wheel ( Float, Float )
    | SetViewport Browser.Dom.Viewport
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
    Html.div []
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
            , HA.spellcheck False
            , HA.autocomplete False
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
            [ Graphics.Render.showRails meshes rails transform
            , Graphics.Render.showPiers meshes piers transform
            ]


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
