module Forth.Geometry.Joint exposing
    ( Joint
    , isMinus
    , isPlus
    , minus
    , mul
    , negate
    , plus
    , toString
    )


{-| 凹凸を表す。 minusが凹、pluｓが凸。
-}
type Joint
    = Joint Bool


minus : Joint
minus =
    Joint False


plus : Joint
plus =
    Joint True


isMinus : Joint -> Bool
isMinus p =
    p == minus


isPlus : Joint -> Bool
isPlus p =
    p == plus


negate : Joint -> Joint
negate p =
    if isPlus p then
        minus

    else
        plus


mul : Joint -> Joint -> Joint
mul p q =
    if isPlus p then
        negate q

    else
        q


toString : Joint -> String
toString p =
    if isPlus p then
        "Joint@plus"

    else
        "Joint@minus"
