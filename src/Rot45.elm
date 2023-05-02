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

{-| 座標系:
点: 4つの整数
向き: 8つの方向
極: 2つの磁性

端点:
レールの端っこの部分など。点と向きと極を持つ。

レールタイプ:
直線や曲線などの種類を表す。
ひとまず enumみたいな感じでとっておく。

type RailType = Straight | Curve | ...

具体的なパラメタについては、適宜Dictを作っておくとか。

レールの実体:
レールタイプおよび原点の端点を持つ。

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
