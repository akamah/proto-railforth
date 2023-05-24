module Forth.Geometry.Dir4Test exposing (dir4, suite)

import Expect exposing (FloatingPointTolerance(..))
import Forth.Geometry.Dir4 as Dir4 exposing (Dir4)
import Forth.Geometry.Rot45 as Rot45
import Fuzz exposing (Fuzzer)
import Test exposing (..)


dir4 : Fuzzer Dir4
dir4 =
    Fuzz.oneOfValues
        [ Dir4.e
        , Dir4.ne
        , Dir4.n
        , Dir4.nw
        ]


toRadianTest : ( String, Float, Dir4 ) -> Test
toRadianTest ( label, expected, d ) =
    test label <|
        \_ ->
            Expect.within (Absolute 0.01) expected <| Dir4.toRadian d


suite : Test
suite =
    describe "Dir4 module"
        [ describe "toRadian" <|
            List.map toRadianTest
                [ ( "Dir4.e", 0.0, Dir4.e )
                , ( "Dir4.ne", 0.7853, Dir4.ne )
                , ( "Dir4.n", 1.5707, Dir4.n )
                , ( "Dir4.nw", 2.3562, Dir4.nw )
                ]
        , describe "mul"
            [ test "mul ne nw --> e" <|
                \_ ->
                    Expect.equal Dir4.e <| Dir4.mul Dir4.ne Dir4.nw
            ]
        , describe "toRot45"
            [ test "toRot45 n" <|
                \_ ->
                    Expect.equal
                        (Rot45.make 0 0 1 0)
                        (Dir4.toRot45 Dir4.n)
            ]
        , describe "inv"
            [ fuzz dir4 "mul x (inv x) = Dir4.e" <|
                \x ->
                    Expect.equal
                        Dir4.e
                        (Dir4.mul x (Dir4.inv x))
            ]
        ]
