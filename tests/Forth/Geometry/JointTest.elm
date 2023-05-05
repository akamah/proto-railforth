module Forth.Geometry.JointTest exposing (..)

import Expect
import Forth.Geometry.Joint as Joint
import Test exposing (..)


suite : Test
suite =
    describe "Joint module"
        [ describe "negate"
            [ test "negate plus" <|
                \_ ->
                    Expect.equal Joint.Minus (Joint.negate Joint.Plus)
            , test "negate minus" <|
                \_ ->
                    Expect.equal Joint.Plus (Joint.negate Joint.Minus)
            ]
        , describe "toString"
            [ test "toString minus" <|
                \_ ->
                    Expect.equal "Joint@minus" (Joint.toString Joint.Minus)
            , test "toString plus" <|
                \_ ->
                    Expect.equal "Joint@plus" (Joint.toString Joint.Plus)
            ]
        ]
