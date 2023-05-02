module SplitView exposing
    ( Model
    , Msg
    , init
    , subscriptions
    , update
    , view
    )

import Browser.Events as BE
import Debug
import Html exposing (Attribute, Html)
import Html.Attributes as HA
import Html.Events as HE
import Json.Decode as Decode exposing (Decoder)


type Orientation
    = Horizontal
    | Vertical


type alias DragStart =
    { startX : Int
    , startY : Int
    , parentWidth : Int
    , parentHeight : Int
    }


type alias DragMove =
    { clientX : Int
    , clientY : Int
    }


type alias Model =
    { orientation : Orientation
    , drag : Maybe DragStart
    }


type Msg
    = MouseDown DragStart
    | MouseMove DragMove
    | MouseUp


init : Model
init =
    { orientation = Horizontal
    , drag = Nothing
    }


view : (Msg -> msg) -> Model -> Html msg -> Html msg -> Html msg
view functor model first second =
    Html.div []
        [ Html.div
            []
            [ first ]
        , Html.div
            [ HA.map functor onMouseDown
            , HA.style "cursor" "row-resize"
            , HA.style "width" "auto"
            , HA.style "height" "8px"
            , HA.style "box-sizing" "border-box"
            , HA.style "background-color" "lightgrey"
            , HA.style "border-style" "outset"
            , HA.style "border-width" "1px"
            ]
            []
        , Html.div [] [ second ]
        ]


onMouseDown : Attribute Msg
onMouseDown =
    HE.on "mousedown" (Decode.map MouseDown mouseDownDecoder)


update : Msg -> Model -> Model
update msg model =
    case msg of
        MouseDown drag ->
            Debug.log "mousedown"
                { model | drag = Just drag }

        MouseMove drag ->
            Debug.log "mousemove" model

        MouseUp ->
            Debug.log "mouseup"
                { model | drag = Nothing }


subscriptions : (Msg -> msg) -> Model -> Sub msg
subscriptions functor model =
    if model.drag == Nothing then
        Sub.none

    else
        Sub.batch
            [ BE.onMouseMove <| Decode.map (functor << MouseMove) mouseMoveDecoder
            , BE.onMouseUp <| Decode.succeed (functor MouseUp)
            ]


mouseDownDecoder : Decoder DragStart
mouseDownDecoder =
    Decode.map4 DragStart
        (Decode.field "clientX" Decode.int)
        (Decode.field "clientY" Decode.int)
        (Decode.at [ "target", "parentElement", "clientWidth" ] Decode.int)
        (Decode.at [ "target", "parentElement", "clientHeight" ] Decode.int)


mouseMoveDecoder : Decoder DragMove
mouseMoveDecoder =
    Decode.map2 DragMove
        (Decode.field "clientX" Decode.int)
        (Decode.field "clientY" Decode.int)
