module Forth.Geometry.JointTest exposing (..)

import Expect
import Forth.Geometry.Joint as Joint
import Test exposing (..)


suite : Test
suite =
    describe "Joint module"
        [ describe "invert"
            [ test "invert plus" <|
                \_ ->
                    Expect.equal Joint.Minus (Joint.invert Joint.Plus)
            , test "invert minus" <|
                \_ ->
                    Expect.equal Joint.Plus (Joint.invert Joint.Minus)
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
