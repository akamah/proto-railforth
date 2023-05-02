module Dir exposing
    ( Dir
    , e
    , n
    , ne
    , nw
    , s
    , se
    , sw
    , w
    )

import Rot45 exposing (Rot45)


type alias Dir =
    Rot45


e : Dir
e =
    Rot45.make 1 0 0 0


ne : Dir
ne =
    Rot45.make 0 1 0 0


n : Dir
n =
    Rot45.make 0 0 1 0


nw : Dir
nw =
    Rot45.make 0 0 0 1


w : Dir
w =
    Rot45.make -1 0 0 0


sw : Dir
sw =
    Rot45.make 0 -1 0 0


s : Dir
s =
    Rot45.make 0 0 -1 0


se : Dir
se =
    Rot45.make 0 0 0 -1
