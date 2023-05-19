module Forth.Geometry.Dir8Test exposing (dir8, suite)

import Expect exposing (FloatingPointTolerance(..))
import Forth.Geometry.Dir8 as Dir8 exposing (Dir8)
import Fuzz exposing (Fuzzer)
import Test exposing (..)


dir8 : Fuzzer Dir8
dir8 =
    Fuzz.oneOfValues
        [ Dir8.e
        , Dir8.ne
        , Dir8.n
        , Dir8.nw
        , Dir8.w
        , Dir8.sw
        , Dir8.s
        , Dir8.se
        ]


toRadianTest : ( String, Float, Dir8 ) -> Test
toRadianTest ( label, expected, d ) =
    test label <|
        \_ ->
            Expect.within (Absolute 0.01) expected <| Dir8.toRadian d


suite : Test
suite =
    describe "Dir8 module"
        [ describe "toRadian" <|
            List.map toRadianTest
                [ ( "Dir8.e", 0.0, Dir8.e )
                , ( "Dir8.ne", 0.7853, Dir8.ne )
                , ( "Dir8.n", 1.5707, Dir8.n )
                , ( "Dir8.nw", 2.3562, Dir8.nw )
                , ( "Dir8.w", 3.1416, Dir8.w )
                , ( "Dir8.sw", 3.9269, Dir8.sw )
                , ( "Dir8.s", 4.7123, Dir8.s )
                , ( "Dir8.se", 5.4977, Dir8.se )
                ]
        , describe "mul"
            [ test "mul s sw --> nw" <|
                \_ ->
                    Expect.equal Dir8.nw <| Dir8.mul Dir8.s Dir8.sw
            ]
        ]
