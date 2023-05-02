module Dir exposing
    ( Dir
    , add
    , e
    , getDir
    , make
    , n
    , ne
    , negate
    , nw
    , s
    , se
    , sub
    , sw
    , w
    )


type Dir
    = Dir Int


getDir : Dir -> Int
getDir (Dir d) =
    d


make : Int -> Dir
make d =
    Dir (modBy 8 d)


e : Dir
e =
    make 0


ne : Dir
ne =
    make 1


n : Dir
n =
    make 2


nw : Dir
nw =
    make 3


w : Dir
w =
    make 4


sw : Dir
sw =
    make 5


s : Dir
s =
    make 6


se : Dir
se =
    make 7


add : Dir -> Dir -> Dir
add x y =
    make <| getDir x + getDir y


negate : Dir -> Dir
negate x =
    make <| Basics.negate (getDir x)


sub : Dir -> Dir -> Dir
sub x y =
    add x (negate y)
