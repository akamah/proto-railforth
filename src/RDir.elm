module RDir exposing
    ( RDir
    , getDir
    , make
    , e
    , ne
    , n
    , nw
    , w
    , sw
    , s
    , se
    , add
    , negate
    , sub
    )

type RDir
    = RDir Int

getDir : RDir -> Int
getDir (RDir d) = d


make : Int -> RDir
make d =
    RDir (modBy 8 d)


e : RDir
e = make 0

ne : RDir
ne = make 1

n : RDir
n = make 2

nw : RDir
nw = make 3

w : RDir
w = make 4

sw : RDir
sw = make 5

s : RDir
s = make 6

se : RDir
se = make 7


add : RDir -> RDir -> RDir
add x y
    = make <| getDir x + getDir y

negate : RDir -> RDir
negate x
    = make <| Basics.negate (getDir x)

sub : RDir -> RDir -> RDir
sub x y
    = add x (negate y)

