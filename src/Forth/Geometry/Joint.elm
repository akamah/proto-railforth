module Forth.Geometry.Joint exposing
    ( Joint(..)
    , invert
    , toString
    )

{-| 凹凸を表す。 minusが凹、pluｓが凸。
-}


type Joint
    = Plus
    | Minus


invert : Joint -> Joint
invert p =
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
