module RPole exposing
    ( RPole
    , isMinus
    , isPlus
    , minus
    , mul
    , negate
    , plus
    )

import Rot45 exposing (Rot45)


type alias RPole =
    Rot45


minus : RPole
minus =
    Rot45.make -1 0 0 0


plus : RPole
plus =
    Rot45.make 1 0 0 0


isMinus : RPole -> Bool
isMinus p =
    p == minus


isPlus : RPole -> Bool
isPlus p =
    p == plus


negate : RPole -> RPole
negate p =
    Rot45.negate p


mul : RPole -> RPole -> RPole
mul p q =
    Rot45.mul p q
