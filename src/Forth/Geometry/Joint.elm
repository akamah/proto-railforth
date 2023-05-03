module Forth.Geometry.Joint exposing
    ( Joint(..)
    , negate
    , toString
    )

{-| 凹凸を表す。 minusが凹、pluｓが凸。
-}


type Joint
    = Plus
    | Minus


negate : Joint -> Joint
negate p =
    case p of
        Plus ->
            Minus

        Minus ->
            Plus


toString : Joint -> String
toString p =
    case p of
        Plus ->
            "Joint@plus"

        Minus ->
            "Joint@minus"
