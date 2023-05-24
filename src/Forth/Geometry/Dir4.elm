module Forth.Geometry.Dir4 exposing
    ( Dir4
    , class
    , e
    , fromDir8
    , inv
    , mul
    , n
    , ne
    , nw
    , toRadian
    , toRot45
    , toString
    )

import Forth.Geometry.Dir exposing (DirClass)
import Forth.Geometry.Dir8 exposing (Dir8(..))
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)


type Dir4
    = Dir4 Int


e : Dir4
e =
    Dir4 0


ne : Dir4
ne =
    Dir4 1


n : Dir4
n =
    Dir4 2


nw : Dir4
nw =
    Dir4 3


toRadian : Dir4 -> Float
toRadian (Dir4 d) =
    Basics.pi / 4.0 * Basics.toFloat d


mul : Dir4 -> Dir4 -> Dir4
mul (Dir4 d1) (Dir4 d2) =
    if d1 + d2 >= 4 then
        Dir4 (d1 + d2 - 4)

    else
        Dir4 (d1 + d2)


inv : Dir4 -> Dir4
inv (Dir4 d) =
    if d == 0 then
        Dir4 0

    else
        Dir4 (4 - d)


aux : Int -> Int -> Int
aux a x =
    if x == a then
        1

    else
        0


toRot45 : Dir4 -> Rot45
toRot45 (Dir4 d) =
    Rot45.make
        (aux 0 d)
        (aux 1 d)
        (aux 2 d)
        (aux 3 d)


fromDir8 : Dir8 -> Dir4
fromDir8 (Dir8 d) =
    if d >= 4 then
        Dir4 (d - 4)

    else
        Dir4 d


toString : Dir4 -> String
toString (Dir4 d) =
    "Dir4 " ++ String.fromInt d


class : DirClass Dir4
class =
    { unit = e
    , mul = mul
    , inv = inv
    , toRot45 = toRot45
    }
