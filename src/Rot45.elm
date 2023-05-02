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


type alias Rot45 =
    { a : Int
    , b : Int
    , c : Int
    , d : Int
    }


make : Int -> Int -> Int -> Int -> Rot45
make a b c d =
    { a = a
    , b = b
    , c = c
    , d = d
    }


zero : Rot45
zero =
    { a = 0
    , b = 0
    , c = 0
    , d = 0
    }


add : Rot45 -> Rot45 -> Rot45
add x y =
    { a = x.a + y.a
    , b = x.b + y.b
    , c = x.c + y.c
    , d = x.d + y.d
    }


negate : Rot45 -> Rot45
negate x =
    { a = -x.a
    , b = -x.b
    , c = -x.c
    , d = -x.d
    }


sub : Rot45 -> Rot45 -> Rot45
sub x y =
    add x (negate y)


{-| 複素数の乗算に似ている
-}
mul : Rot45 -> Rot45 -> Rot45
mul x y =
    { a = x.a * y.a - x.b * y.d - x.c * y.c - x.d * y.b
    , b = x.a * y.b + x.b * y.a - x.c * y.d - x.d * y.c
    , c = x.a * y.c + x.b * y.b + x.c * y.a - x.d * y.d
    , d = x.a * y.d + x.b * y.c + x.c * y.b + x.d * y.a
    }


sqrt1_2 : Float
sqrt1_2 =
    sqrt (1 / 2.0)


toFloat : Rot45 -> ( Float, Float )
toFloat x =
    ( Basics.toFloat x.a + sqrt1_2 * Basics.toFloat (x.b - x.d)
    , Basics.toFloat x.c + sqrt1_2 * Basics.toFloat (x.b + x.d)
    )
