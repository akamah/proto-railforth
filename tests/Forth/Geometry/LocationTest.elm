module Forth.Geometry.LocationTest exposing (location, suite)

import Expect exposing (FloatingPointTolerance(..))
import Forth.Geometry.Dir as Dir
import Forth.Geometry.DirTest exposing (dir)
import Forth.Geometry.Joint as Joint
import Forth.Geometry.JointTest exposing (joint)
import Forth.Geometry.Location as Location exposing (..)
import Forth.Geometry.Rot45 as Rot45
import Forth.Geometry.Rot45Test exposing (rot45)
import Fuzz exposing (Fuzzer)
import Test exposing (..)


location : Fuzzer Location
location =
    Fuzz.map5
        Location.make
        rot45
        rot45
        (Fuzz.intRange -32768 32767)
        dir
        joint


suite : Test
suite =
    describe "Joint module"
        [ describe "mul" <|
            [ fuzz (Fuzz.triple location location location)
                "x * (y * z) = (x * y) * z"
              <|
                \( x, y, z ) ->
                    Expect.equal
                        (mul (mul x y) z)
                        (mul x (mul y z))
            , fuzz location "zero * x = x" <|
                \x ->
                    Expect.equal
                        (mul zero x)
                        x
            ]
        , describe "negate"
            [ fuzz location "x * x^1 = zero" <|
                \x ->
                    Expect.equal
                        (mul
                            x
                            (Location.negate x)
                        )
                        { zero | joint = x.joint }
            , test "negete example" <|
                \_ ->
                    Expect.equal
                        (Location.make (Rot45.make 0 -1 1 0) Rot45.zero 2 Dir.se Joint.Minus)
                        (Location.negate <| Location.make (Rot45.make 0 0 1 -1) Rot45.zero -2 Dir.ne Joint.Minus)
            ]
        ]
