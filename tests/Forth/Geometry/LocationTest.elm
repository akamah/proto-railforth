module Forth.Geometry.LocationTest exposing (..)

import Expect exposing (FloatingPointTolerance(..))
import Forth.Geometry.DirTest exposing (dir)
import Forth.Geometry.Location as Location exposing (..)
import Forth.Geometry.Rot45Test exposing (rot45)
import Fuzz exposing (Fuzzer)
import Test exposing (..)


location : Fuzzer Location
location =
    Fuzz.map4
        Location.make
        rot45
        rot45
        (Fuzz.intRange -32768 32767)
        dir


suite : Test
suite =
    describe "Location module"
        [ describe "flip" <|
            [ fuzz location
                "flip (flip x) = x"
              <|
                \x ->
                    Expect.equal
                        x
                        (flip (flip x))
            ]
        , describe "mul"
            [ fuzz (Fuzz.triple location location location) "(a * b) * c = a * (b * c)" <|
                \( a, b, c ) ->
                    Expect.equal
                        (mul a (mul b c))
                        (mul (mul a b) c)
            ]
        ]
