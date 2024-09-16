module Main exposing (main)

import Browser
import Browser.Dom
import Browser.Events
import Dict
import Forth
import Graphics.MeshLoader as MeshLoader
import Graphics.OrbitControl as OC
import Html exposing (Html)
import Html.Attributes as HA exposing (style)
import Html.Events as HE
import Json.Decode as Decode exposing (Decoder)
import Math.Matrix4 exposing (Mat4)
import Math.Vector3 exposing (vec3)
import PointerEvent as PE
import Storage
import Task
import Types.PierPlacement exposing (PierPlacement)
import Types.RailPlacement exposing (RailPlacement)
import WebGL


type Msg
    = LoadMesh MeshLoader.Msg
    | PointerDown PE.PointerEvent
    | PointerMove PE.PointerEvent
    | PointerUp PE.PointerEvent
    | Wheel ( Float, Float )
    | ContextMenu
    | SetViewport Browser.Dom.Viewport
    | Resize Float Float
    | UpdateScript String
    | SplitBarBeginMove PE.PointerEvent
    | SplitBarUpdateMove PE.PointerEvent
    | SplitBarEndMove PE.PointerEvent


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
    , isSplitBarDragging : Bool
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
      , isSplitBarDragging = False
      , splitBarPosition = 300.0
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
        barThickness =
            8

        railViewTop =
            0

        railViewRight =
            0

        railViewHeight =
            model.viewport.height

        railViewWidth =
            model.viewport.width - model.splitBarPosition - barThickness / 2

        barTop =
            0

        barLeft =
            model.splitBarPosition - barThickness / 2

        barWidth =
            barThickness

        barHeight =
            model.viewport.height

        editorTop =
            0

        editorLeft =
            0

        editorWidth =
            model.splitBarPosition - barThickness / 2

        editorHeight =
            model.viewport.height
    in
    Html.div []
        [ viewCanvas
            { width = railViewWidth
            , height = railViewHeight
            , top = railViewTop
            , right = railViewRight
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
            , style "top" (px railViewTop)
            , style "right" (px railViewRight)
            , style "width" (px railViewWidth)
            , style "height" (px railViewHeight)
            , style "font-size" "1rem"
            , style "pointer-events" "none"
            , style "touch-action" "none"
            , style "z-index" "100"
            ]
            [ Html.text <| Maybe.withDefault "" <| model.errMsg ]

        -- bar
        , Html.div
            [ style "display" "block"
            , style "position" "absolute"
            , style "top" (px barTop)
            , style "left" (px barLeft)
            , style "width" (px barWidth)
            , style "height" (px barHeight)
            , style "cursor" "col-resize"
            , style "box-sizing" "border-box"
            , style "background-color" "lightgrey"
            , style "border-style" "outset"
            , style "border-width" "1px"
            , style "touch-action" "none"
            , onSplitBarDragBegin model
            , onSplitBarDragMove model
            , onSplitBarDragEnd model
            ]
            []

        -- editor
        , Html.textarea
            [ style "display" "block"
            , style "position" "absolute"
            , style "resize" "none"
            , style "top" (px editorTop)
            , style "left" (px editorLeft)
            , style "width" (px editorWidth)
            , style "height" (px editorHeight)
            , style "margin" "0"
            , style "padding" "0.5em"
            , style "border" "none"
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
    { right : Float
    , top : Float
    , width : Float
    , height : Float
    , meshes : MeshLoader.Model
    , rails : List RailPlacement
    , piers : List PierPlacement
    , transform : Mat4
    }
    -> Html Msg
viewCanvas { right, top, width, height, meshes, rails, piers, transform } =
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
        , HA.style "right" (right |> px)
        , HA.style "top" (top |> px)
        , HA.style "width" (width |> px)
        , HA.style "height" (height |> px)
        , HA.style "touch-action" "none"
        , onWheelHandler
        , onPointerDownHandler
        , onPointerMoveHandler
        , onPointerUpHandler
        , onContextMenuHandler
        ]
    <|
        List.concat
            [ MeshLoader.renderRails meshes rails transform
            , MeshLoader.renderPiers meshes piers transform
            ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadMesh meshMsg ->
            ( { model | meshes = MeshLoader.update meshMsg model.meshes }, Cmd.none )

        PointerDown event ->
            ( { model | orbitControl = OC.updatePointerDown model.orbitControl ( event.clientX, event.clientY ) event.shiftKey }
            , PE.setPointerCapture event
              -- necessary for tracking the pointer event outside of the canvas
            )

        PointerMove event ->
            ( { model | orbitControl = OC.updateMouseMove model.orbitControl ( event.clientX, event.clientY ) }, Cmd.none )

        PointerUp _ ->
            ( { model | orbitControl = OC.updateMouseUp model.orbitControl }, Cmd.none )

        Wheel pos ->
            let
                _ =
                    Debug.log "wheel" pos
            in
            ( { model | orbitControl = OC.updateWheel model.orbitControl pos }, Cmd.none )

        ContextMenu ->
            ( model, Cmd.none )

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

        SplitBarBeginMove event ->
            ( { model | isSplitBarDragging = True }, PE.setPointerCapture event )

        SplitBarUpdateMove event ->
            if model.isSplitBarDragging then
                let
                    splitBarPosition =
                        clamp 100 (model.viewport.width - 100) event.clientX
                in
                ( { model
                    | splitBarPosition = splitBarPosition
                    , orbitControl = OC.updateViewport (model.viewport.width - splitBarPosition - 4) model.viewport.height model.orbitControl
                  }
                , Cmd.none
                )

            else
                ( model, Cmd.none )

        SplitBarEndMove _ ->
            ( { model | isSplitBarDragging = False }, Cmd.none )


updateViewport : Float -> Float -> Model -> Model
updateViewport w h model =
    let
        splitBarPosition =
            clamp 10 (w - 10) (w * 0.3)
    in
    { model
        | viewport = { width = w, height = h }
        , orbitControl = OC.updateViewport (w - splitBarPosition - 4) h model.orbitControl
        , splitBarPosition = splitBarPosition
    }


wheelEventDecoder : Decoder ( Float, Float )
wheelEventDecoder =
    Decode.map2 (\x y -> ( x, y ))
        (Decode.field "deltaX" Decode.float)
        (Decode.field "deltaY" Decode.float)


preventDefaultDecoder : Decoder a -> Decoder ( a, Bool )
preventDefaultDecoder =
    Decode.map (\a -> ( a, True ))


onPointerDownHandler : Html.Attribute Msg
onPointerDownHandler =
    HE.on "pointerdown" <|
        Decode.map PointerDown PE.decode


onPointerMoveHandler : Html.Attribute Msg
onPointerMoveHandler =
    HE.on "pointermove" <|
        Decode.map PointerMove PE.decode


onPointerUpHandler : Html.Attribute Msg
onPointerUpHandler =
    HE.on "pointerup" <|
        Decode.map PointerUp PE.decode


onSplitBarDragBegin : Model -> Html.Attribute Msg
onSplitBarDragBegin _ =
    HE.preventDefaultOn "pointerdown" <|
        preventDefaultDecoder <|
            Decode.map SplitBarBeginMove PE.decode


onSplitBarDragMove : Model -> Html.Attribute Msg
onSplitBarDragMove _ =
    HE.preventDefaultOn "pointermove" <|
        preventDefaultDecoder <|
            Decode.map SplitBarUpdateMove PE.decode


onSplitBarDragEnd : Model -> Html.Attribute Msg
onSplitBarDragEnd _ =
    HE.preventDefaultOn "pointerup" <|
        preventDefaultDecoder <|
            Decode.map SplitBarEndMove PE.decode


onWheelHandler : Html.Attribute Msg
onWheelHandler =
    HE.preventDefaultOn "wheel"
        (Decode.map Wheel wheelEventDecoder |> preventDefaultDecoder)


onContextMenuHandler : Html.Attribute Msg
onContextMenuHandler =
    HE.preventDefaultOn "contextmenu"
        (Decode.succeed ContextMenu |> preventDefaultDecoder)


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onResize (\w h -> Resize (toFloat w) (toFloat h))
        ]
