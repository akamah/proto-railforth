module Forth.Geometry.DirTest exposing (..)

import Expect exposing (FloatingPointTolerance(..))
import Forth.Geometry.Dir as Dir exposing (Dir)
import Test exposing (..)


toRadianTest : ( String, Float, Dir ) -> Test
toRadianTest ( label, expected, dir ) =
    test label <|
        \_ ->
            Expect.within (Absolute 0.01) expected <| Dir.toRadian dir


suite : Test
suite =
    describe "Dir module"
        [ describe "toRadian" <|
            List.map toRadianTest
                [ ( "Dir.e", 0.0, Dir.e )
                , ( "Dir.ne", 0.7853, Dir.ne )
                , ( "Dir.n", 1.5707, Dir.n )
                , ( "Dir.nw", 2.3562, Dir.nw )
                , ( "Dir.w", 3.1416, Dir.w )
                , ( "Dir.sw", 3.9269, Dir.sw )
                , ( "Dir.s", 4.7123, Dir.s )
                , ( "Dir.se", 5.4977, Dir.se )
                ]
        , describe "mul"
            [ test "mul s sw --> nw" <|
                \_ ->
                    Expect.equal Dir.nw <| Dir.mul Dir.s Dir.sw
            ]
        ]
