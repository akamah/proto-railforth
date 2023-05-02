module SplitView exposing
    ( Model
    , init
    , view
    )

import Html exposing (Html, div)


type Orientation
    = Horizontal
    | Vertical


type alias Model =
    { orientation : Orientation }


init : Model
init =
    { orientation = Vertical }


view : Model -> Html msg -> Html msg -> Html msg
view model first second =
    div [] [ first, second ]
