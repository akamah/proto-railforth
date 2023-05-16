module Forth.Geometry.JointTest exposing (..)

import Expect
import Forth.Geometry.Joint as Joint exposing (Joint)
import Fuzz exposing (Fuzzer)
import Test exposing (..)


joint : Fuzzer Joint
joint =
    Fuzz.oneOfValues [ Joint.Plus, Joint.Minus ]


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
        , describe "match"
            [ test "match Plus Minus" <|
                \_ ->
                    Expect.equal True (Joint.match Joint.Plus Joint.Minus)
            ]
        , describe "toString"
            [ test "toString minus" <|
                \_ ->
                    Expect.equal "Minus" (Joint.toString Joint.Minus)
            , test "toString plus" <|
                \_ ->
                    Expect.equal "Plus" (Joint.toString Joint.Plus)
            ]
        ]
