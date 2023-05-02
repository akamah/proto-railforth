module JointTest exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Joint exposing (..)
import Test exposing (..)


suite : Test
suite =
    describe "Joint module"
        [ describe "distinguishable"
            [ test "minus is not plus" <|
                \_ ->
                    Expect.notEqual minus plus
            ]
        , describe "isMinus"
            [ test "isMinus minus" <|
                \_ ->
                    isMinus minus
                        |> Expect.true "isMinus minus"
            , test "isMinus plus" <|
                \_ ->
                    isMinus plus
                        |> Expect.false "isMinus plus"
            ]
        , describe "isPlus"
            [ test "isPlus minus" <|
                \_ ->
                    isPlus minus
                        |> Expect.false "isPlus minus"
            , test "isPlus plus" <|
                \_ ->
                    isPlus plus
                        |> Expect.true "isPlus plus"
            ]
        , describe "negate"
            [ test "negate plus" <|
                \_ ->
                    Expect.equal minus (Joint.negate plus)
            , test "negate minus" <|
                \_ ->
                    Expect.equal plus (Joint.negate minus)
            ]
        , describe "mul"
            [ test "mul plus plus" <|
                \_ ->
                    Expect.equal minus (mul plus plus)
            , test "mul plus minus" <|
                \_ ->
                    Expect.equal plus (mul plus minus)
            , test "mul minus plus" <|
                \_ ->
                    Expect.equal plus (mul minus plus)
            , test "mul minus minus" <|
                \_ ->
                    Expect.equal minus (mul minus minus)
            ]
        , describe "toString"
            [ test "toString minus" <|
                \_ ->
                    Expect.equal "Joint@minus" (toString minus)
            , test "toString plus" <|
                \_ ->
                    Expect.equal "Joint@plus" (toString plus)
            ]
        ]
