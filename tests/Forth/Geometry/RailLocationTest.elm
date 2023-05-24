module Forth.Geometry.RailLocationTest exposing (location, suite)

import Expect exposing (FloatingPointTolerance(..))
import Forth.Geometry.Dir as Dir
import Forth.Geometry.DirTest exposing (dir)
import Forth.Geometry.Joint as Joint
import Forth.Geometry.JointTest exposing (joint)
import Forth.Geometry.RailLocation as RailLocation exposing (..)
import Forth.Geometry.Rot45 as Rot45
import Forth.Geometry.Rot45Test exposing (rot45)
import Fuzz exposing (Fuzzer)
import Test exposing (..)


location : Fuzzer RailLocation
location =
    Fuzz.map5
        RailLocation.make
        rot45
        rot45
        (Fuzz.intRange -32768 32767)
        dir
        joint


suite : Test
suite =
    describe "RailLocation module"
        [ describe "mul" <|
            [ fuzz (Fuzz.triple location location location)
                "x * (y * z) = (x * y) * z"
              <|
                \( x, y, z ) ->
                    Expect.equal
                        (mul (mul x.location y).location z)
                        (mul x.location (mul y.location z))
            , fuzz location "zero * x = x" <|
                \x ->
                    Expect.equal
                        (mul zero.location x)
                        x
            ]
        , describe "negate"
            [ fuzz location "x * x^1 = zero" <|
                \x ->
                    Expect.equal
                        (mul
                            x.location
                            (RailLocation.inv x)
                        )
                        { zero | joint = x.joint }
            , test "negete example" <|
                \_ ->
                    Expect.equal
                        (RailLocation.make (Rot45.make 0 -1 1 0) Rot45.zero 2 Dir.se Joint.Minus)
                        (RailLocation.inv <| RailLocation.make (Rot45.make 0 0 1 -1) Rot45.zero -2 Dir.ne Joint.Minus)
            ]
        ]
