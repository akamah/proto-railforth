module Forth.Geometry.LocationTest exposing (..)

import Expect exposing (FloatingPointTolerance(..))
import Forth.Geometry.Dir8 as Dir8 exposing (Dir8)
import Forth.Geometry.Dir8Test exposing (dir8)
import Forth.Geometry.Location as Location exposing (..)
import Forth.Geometry.Rot45Test exposing (rot45)
import Fuzz exposing (Fuzzer)
import Test exposing (..)


location : Fuzzer (Location Dir8)
location =
    Fuzz.map4
        Location.make
        rot45
        rot45
        (Fuzz.intRange -32768 32767)
        dir8


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
                        (flip Dir8.class (flip Dir8.class x))
            ]
        , describe "mul"
            [ fuzz (Fuzz.triple location location location) "(a * b) * c = a * (b * c)" <|
                \( a, b, c ) ->
                    Expect.equal
                        (mul Dir8.class a (mul Dir8.class b c))
                        (mul Dir8.class (mul Dir8.class a b) c)
            ]
        ]
