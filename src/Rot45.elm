module Rot45 exposing
    ( Rot45
    , add
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
    = Rot45
        { a : Int
        , b : Int
        , c : Int
        , d : Int
        }


make : Int -> Int -> Int -> Int -> Rot45
make a b c d =
    Rot45
        { a = a
        , b = b
        , c = c
        , d = d
        }


getA : Rot45 -> Int
getA (Rot45 { a }) =
    a


getB : Rot45 -> Int
getB (Rot45 { b }) =
    b


getC : Rot45 -> Int
getC (Rot45 { c }) =
    c


getD : Rot45 -> Int
getD (Rot45 { d }) =
    d


zero : Rot45
zero =
    make 0 0 0 0


add : Rot45 -> Rot45 -> Rot45
add x y =
    make
        (getA x + getA y)
        (getB x + getB y)
        (getC x + getC y)
        (getD x + getD y)


negate : Rot45 -> Rot45
negate x =
    make
        (Basics.negate <| getA x)
        (Basics.negate <| getB x)
        (Basics.negate <| getC x)
        (Basics.negate <| getD x)


sub : Rot45 -> Rot45 -> Rot45
sub x y =
    add x (negate y)


{-| 複素数の乗算に似ている
-}
mul : Rot45 -> Rot45 -> Rot45
mul x y =
    make
        (getA x * getA y - getB x * getD y - getC x * getC y - getD x * getB y)
        (getA x * getB y + getB x * getA y - getC x * getD y - getD x * getC y)
        (getA x * getC y + getB x * getB y + getC x * getA y - getD x * getD y)
        (getA x * getD y + getB x * getC y + getC x * getB y + getD x * getA y)


sqrt1_2 : Float
sqrt1_2 =
    sqrt (1.0 / 2.0)


toFloat : Rot45 -> ( Float, Float )
toFloat x =
    ( Basics.toFloat (getA x) + sqrt1_2 * Basics.toFloat (getB x - getD x)
    , Basics.toFloat (getC x) + sqrt1_2 * Basics.toFloat (getB x + getD x)
    )
