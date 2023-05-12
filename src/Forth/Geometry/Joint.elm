module Forth.Geometry.Joint exposing
    ( Joint(..)
    , invert
    , match
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


match : Joint -> Joint -> Bool
match x y =
    x /= y


toString : Joint -> String
toString p =
    case p of
        Plus ->
            "Joint@plus"

        Minus ->
            "Joint@minus"
