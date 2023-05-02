module SplitBar exposing (Orientation(..), view)

import Browser.Events as BE
import Debug
import Html exposing (Attribute, Html)
import Html.Attributes as HA
import Html.Events as HE
import Json.Decode as Decode exposing (Decoder)


type Orientation
    = Horizontal
    | Vertical


view : List (Attribute msg) -> Html msg
view attributes =
    Html.div
        List.append
        [ HA.style "cursor" "row-resize"
        , HA.style "width" "auto"
        , HA.style "height" "8px"
        , HA.style "box-sizing" "border-box"
        , HA.style "background-color" "lightgrey"
        , HA.style "border-style" "outset"
        , HA.style "border-width" "1px"
        ]
        attributes
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
