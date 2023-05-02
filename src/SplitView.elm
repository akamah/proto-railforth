module SplitBar exposing
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


type alias Drag =
    { clientX : Int
    , clientY : Int
    }


type alias Model =
    { orientation : Orientation
    , drag : Maybe Drag
    }


type Msg
    = MouseDown Drag
    | MouseMove Drag
    | MouseUp


init : Model
init =
    { orientation = Horizontal
    , drag = Nothing
    }


view : (Msg -> msg) -> Model -> Html msg
view functor model =
    Html.div
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


onMouseDown : Attribute Msg
onMouseDown =
    preventDefaultAndStopPropagation "mousedown" (Decode.map MouseDown mouseDecoder)


preventDefaultAndStopPropagation : String -> Decoder msg -> Attribute msg
preventDefaultAndStopPropagation event decoder =
    HE.custom event
        (Decode.map
            (\x ->
                { message = x, stopPropagation = True, preventDefault = True }
            )
            decoder
        )


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
            [ BE.onMouseMove <| Decode.map (functor << MouseMove) mouseDecoder
            , BE.onMouseUp <| Decode.succeed (functor MouseUp)
            ]


mouseDecoder : Decoder Drag
mouseDecoder =
    Decode.map2 Drag
        (Decode.field "clientX" Decode.int)
        (Decode.field "clientY" Decode.int)
