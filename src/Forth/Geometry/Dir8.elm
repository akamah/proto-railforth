module Forth.Geometry.Dir8 exposing
    ( Dir8(..)
    , class
    , e
    , inv
    , mul
    , n
    , ne
    , nw
    , s
    , se
    , sw
    , toRadian
    , toRot45
    , toString
    , w
    )

import Forth.Geometry.Dir exposing (DirClass)
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)


{-| 8つの方向を表す。
e (東)が基本的な方向。感覚としては数学のグラフに合わせた。
-}
type Dir8
    = Dir8 Int


e : Dir8
e =
    Dir8 0


ne : Dir8
ne =
    Dir8 1


n : Dir8
n =
    Dir8 2


nw : Dir8
nw =
    Dir8 3


w : Dir8
w =
    Dir8 4


sw : Dir8
sw =
    Dir8 5


s : Dir8
s =
    Dir8 6


se : Dir8
se =
    Dir8 7


toRadian : Dir8 -> Float
toRadian (Dir8 d) =
    Basics.pi / 4.0 * Basics.toFloat d


mul : Dir8 -> Dir8 -> Dir8
mul (Dir8 d1) (Dir8 d2) =
    if d1 + d2 >= 8 then
        Dir8 (d1 + d2 - 8)

    else
        Dir8 (d1 + d2)


inv : Dir8 -> Dir8
inv (Dir8 d) =
    if d == 0 then
        Dir8 0

    else
        Dir8 (8 - d)


aux : Int -> Int -> Int -> Int
aux a b x =
    if x == a then
        1

    else if x == b then
        -1

    else
        0


toRot45 : Dir8 -> Rot45
toRot45 (Dir8 d) =
    Rot45.make
        (aux 0 4 d)
        (aux 1 5 d)
        (aux 2 6 d)
        (aux 3 7 d)


toString : Dir8 -> String
toString (Dir8 d) =
    "Dir8 " ++ String.fromInt d


class : DirClass Dir8
class =
    { unit = e
    , mul = mul
    , inv = inv
    , toRot45 = toRot45
    }
