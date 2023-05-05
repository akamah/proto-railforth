module Forth.Geometry.Rot45 exposing
    ( Rot45
    , add
    , extract
      -- , getA
      -- , getB
      -- , getC
      -- , getD
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



-- getA : Rot45 -> Int
-- getA x =
--     extract x (\a _ _ _ -> a)
-- getB : Rot45 -> Int
-- getB x =
--     extract x (\_ b _ _ -> b)
-- getC : Rot45 -> Int
-- getC x =
--     extract x (\_ _ c _ -> c)
-- getD : Rot45 -> Int
-- getD x =
--     extract x (\_ _ d _ -> d)


zero : Rot45
zero =
    make 0 0 0 0


add : Rot45 -> Rot45 -> Rot45
add x y =
    extract x <|
        \xa xb xc xd ->
            extract y <|
                \ya yb yc yd ->
                    make (xa + ya) (xb + yb) (xc + yc) (xd + yd)


negate : Rot45 -> Rot45
negate x =
    extract x <|
        \a b c d ->
            make -a -b -c -d


sub : Rot45 -> Rot45 -> Rot45
sub x y =
    add x (negate y)


{-| 複素数の乗算に似ている
-}
mul : Rot45 -> Rot45 -> Rot45
mul x y =
    extract x <|
        \xa xb xc xd ->
            extract y <|
                \ya yb yc yd ->
                    make
                        (xa * ya - xb * yd - xc * yc - xd * yb)
                        (xa * yb + xb * ya - xc * yd - xd * yc)
                        (xa * yc + xb * yb + xc * ya - xd * yd)
                        (xa * yd + xb * yc + xc * yb + xd * ya)


sqrt1_2 : Float
sqrt1_2 =
    sqrt (1.0 / 2.0)


toFloat : Rot45 -> ( Float, Float )
toFloat x =
    extract x <|
        \a b c d ->
            ( Basics.toFloat a + sqrt1_2 * Basics.toFloat (b - d)
            , Basics.toFloat c + sqrt1_2 * Basics.toFloat (b + d)
            )
