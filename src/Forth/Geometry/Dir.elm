module Forth.Geometry.Dir exposing
    ( Dir(..)
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
    , toUndirectedDir
    , w
    )

import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)


{-| 8つの方向を表す。
e (東)が基本的な方向。感覚としては数学のグラフに合わせた。
-}
type Dir
    = Dir Int


e : Dir
e =
    Dir 0


ne : Dir
ne =
    Dir 1


n : Dir
n =
    Dir 2


nw : Dir
nw =
    Dir 3


w : Dir
w =
    Dir 4


sw : Dir
sw =
    Dir 5


s : Dir
s =
    Dir 6


se : Dir
se =
    Dir 7


toRadian : Dir -> Float
toRadian (Dir d) =
    Basics.pi / 4.0 * Basics.toFloat d


mul : Dir -> Dir -> Dir
mul (Dir d1) (Dir d2) =
    if d1 + d2 >= 8 then
        Dir (d1 + d2 - 8)

    else
        Dir (d1 + d2)


inv : Dir -> Dir
inv (Dir d) =
    if d == 0 then
        Dir 0

    else
        Dir (8 - d)


toRot45 : Dir -> Rot45
toRot45 (Dir d) =
    let
        aux a b x =
            if x == a then
                1

            else if x == b then
                -1

            else
                0
    in
    Rot45.make
        (aux 0 4 d)
        (aux 1 5 d)
        (aux 2 6 d)
        (aux 3 7 d)


toUndirectedDir : Dir -> Dir
toUndirectedDir (Dir x) =
    if x >= 4 then
        Dir (x - 4)

    else
        Dir x


toString : Dir -> String
toString (Dir d) =
    "Dir " ++ String.fromInt d
