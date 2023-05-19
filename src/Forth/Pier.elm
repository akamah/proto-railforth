module Forth.Pier exposing
    ( Pier(..)
    , toString
    )

{- 後から追加されるレールによって橋脚が単線から複線になったりすることも考えられるため、オンライン処理は諦めて最後に一括で行うことにした。 | -}


type Pier
    = Single
    | Wide
    | Mini


toString : Pier -> String
toString pier =
    case pier of
        Single ->
            "pier"

        Wide ->
            "pier_wide"

        Mini ->
            "pier_4"



-- doubleTrackConstruct : Dict String ( Dir4, List PierLocation ) -> ( Dict String ( Dir4, List PierLocation ), Dict String ( Dir4, List PierLocation, List PierLocation ) )
-- doubleTrackConstruct state = doubleTrackConstructRec state Dict.empty Dict.empty
-- doubleTrackConstructRec state single double =
