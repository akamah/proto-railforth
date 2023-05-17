module Forth.Geometry.LocationTest exposing (..)

import Expect exposing (FloatingPointTolerance(..))
import Forth.Geometry.Location as Location exposing (..)
import Forth.Geometry.Rot45Test exposing (rot45)
import Fuzz exposing (Fuzzer)
import Test exposing (..)


location : Fuzzer Location
location =
    Fuzz.map3
        Location.make
        rot45
        rot45
        (Fuzz.intRange -32768 32767)


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
        ]
