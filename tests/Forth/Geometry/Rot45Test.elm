module Forth.Geometry.Rot45Test exposing (rot45, suite)

import Expect exposing (FloatingPointTolerance(..))
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Fuzz exposing (Fuzzer)
import Test exposing (..)


shortInt : Fuzzer Int
shortInt =
    Fuzz.intRange -32768 32767


rot45 : Fuzzer Rot45
rot45 =
    Fuzz.map4 Rot45.make shortInt shortInt shortInt shortInt


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
            , fuzz (Fuzz.pair shortInt rot45) "multiply by scalar" <|
                \( r, x ) ->
                    Expect.equal
                        (Rot45.extract x (\a b c d -> Rot45.make (r * a) (r * b) (r * c) (r * d)))
                        (Rot45.mul (Rot45.make r 0 0 0) x)
            , fuzz rot45 "rotate by 45 degree" <|
                \x ->
                    Expect.equal
                        (Rot45.extract x (\a b c d -> Rot45.make -d a b c))
                        (Rot45.mul (Rot45.make 0 1 0 0) x)
            , fuzz rot45 "rotate by 90 degree" <|
                \x ->
                    Expect.equal
                        (Rot45.extract x (\a b c d -> Rot45.make -c -d a b))
                        (Rot45.mul (Rot45.make 0 0 1 0) x)
            , fuzz rot45 "rotate by 135 degree" <|
                \x ->
                    Expect.equal
                        (Rot45.extract x (\a b c d -> Rot45.make -b -c -d a))
                        (Rot45.mul (Rot45.make 0 0 0 1) x)
            ]
        ]
