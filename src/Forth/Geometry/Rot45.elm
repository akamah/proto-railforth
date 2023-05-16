module Forth.Geometry.Rot45 exposing
    ( Rot45
    , add
    , conj
    , extract
    , make
    , mul
    , negate
    , sub
    , toFloat
    , zero
    )

{-| 座標系の要となる。意味的にはPointなのだが、良い名前が思いつかなかったので。
実質的には4つの整数であり。東方向、北東方向、北方向、北西方向の4つのベクトルの整数重合。
-}


type Rot45
    = Rot45 Int Int Int Int


make : Int -> Int -> Int -> Int -> Rot45
make a b c d =
    Rot45 a b c d


extract : Rot45 -> (Int -> Int -> Int -> Int -> b) -> b
extract (Rot45 a b c d) f =
    f a b c d


zero : Rot45
zero =
    make 0 0 0 0


add : Rot45 -> Rot45 -> Rot45
add (Rot45 xa xb xc xd) (Rot45 ya yb yc yd) =
    make (xa + ya) (xb + yb) (xc + yc) (xd + yd)


negate : Rot45 -> Rot45
negate (Rot45 a b c d) =
    make -a -b -c -d


sub : Rot45 -> Rot45 -> Rot45
sub x y =
    add x (negate y)


{-| 複素数の乗算のように、回転操作のようなイメージ
-}
mul : Rot45 -> Rot45 -> Rot45
mul (Rot45 xa xb xc xd) (Rot45 ya yb yc yd) =
    make
        (xa * ya - xb * yd - xc * yc - xd * yb)
        (xa * yb + xb * ya - xc * yd - xd * yc)
        (xa * yc + xb * yb + xc * ya - xd * yd)
        (xa * yd + xb * yc + xc * yb + xd * ya)


conj : Rot45 -> Rot45
conj (Rot45 a b c d) =
    make a -d -c -b


toFloat : Rot45 -> ( Float, Float )
toFloat (Rot45 a b c d) =
    ( Basics.toFloat a + Basics.sqrt (1.0 / 2.0) * Basics.toFloat (b - d)
    , Basics.toFloat c + Basics.sqrt (1.0 / 2.0) * Basics.toFloat (b + d)
    )
