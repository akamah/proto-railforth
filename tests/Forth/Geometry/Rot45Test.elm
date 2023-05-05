module Forth.Geometry.Rot45Test exposing (suite)

import Expect exposing (FloatingPointTolerance(..))
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Fuzz exposing (Fuzzer)
import Test exposing (..)


shortInt : Fuzzer Int
shortInt =
    Fuzz.intRange -32768 32767


rot45 : Fuzzer Rot45
rot45 =
    Fuzz.map4 (\a b c d -> Rot45.make a b c d) shortInt shortInt shortInt shortInt


suite : Test
suite =
    describe "Rot45 module"
        [ describe "add" <|
            [ fuzz (Fuzz.pair rot45 rot45) "a + b = b + a" <|
                \( a, b ) ->
                    Expect.equal
                        (Rot45.add a b)
                        (Rot45.add b a)
            , fuzz (Fuzz.triple rot45 rot45 rot45) "(a + b) + c = a + (b + c)" <|
                \( a, b, c ) ->
                    Expect.equal
                        (Rot45.add (Rot45.add a b) c)
                        (Rot45.add a (Rot45.add b c))
            , fuzz rot45 "a + 0 = a" <|
                \a ->
                    Expect.equal
                        a
                        (Rot45.add a Rot45.zero)
            ]
        , describe "negate" <|
            [ fuzz rot45 "-(-a) = a" <|
                \a ->
                    Expect.equal
                        a
                        (Rot45.negate (Rot45.negate a))
            , fuzz rot45 "a + (-a) = 0" <|
                \a ->
                    Expect.equal
                        Rot45.zero
                        (Rot45.add a (Rot45.negate a))
            ]
        , describe "sub" <|
            [ fuzz (Fuzz.pair rot45 rot45) "a - b = a + (-b)" <|
                \( a, b ) ->
                    Expect.equal
                        (Rot45.add a (Rot45.negate b))
                        (Rot45.sub a b)
            ]
        , describe "mul" <|
            [ fuzz (Fuzz.pair rot45 rot45) "a * b = b * a" <|
                \( a, b ) ->
                    Expect.equal
                        (Rot45.mul a b)
                        (Rot45.mul b a)
            , fuzz (Fuzz.triple rot45 rot45 rot45) "(a * b) * c = a * (b * c)" <|
                \( a, b, c ) ->
                    Expect.equal
                        (Rot45.mul (Rot45.mul a b) c)
                        (Rot45.mul a (Rot45.mul b c))
            , fuzz (Fuzz.triple rot45 rot45 rot45) "a * (b + c) = a * b + a * c" <|
                \( a, b, c ) ->
                    Expect.equal
                        (Rot45.mul a (Rot45.add b c))
                        (Rot45.add (Rot45.mul a b) (Rot45.mul a c))
            ]
        ]
