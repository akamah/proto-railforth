module Joint exposing
    ( Joint
    , isMinus
    , isPlus
    , minus
    , mul
    , negate
    , plus
    )

import Rot45 exposing (Rot45)


type alias Joint =
    Rot45


minus : Joint
minus =
    Rot45.make -1 0 0 0


plus : Joint
plus =
    Rot45.make 1 0 0 0


isMinus : Joint -> Bool
isMinus p =
    p == minus


isPlus : Joint -> Bool
isPlus p =
    p == plus


negate : Joint -> Joint
negate p =
    Rot45.negate p


mul : Joint -> Joint -> Joint
mul p q =
    Rot45.mul p q
