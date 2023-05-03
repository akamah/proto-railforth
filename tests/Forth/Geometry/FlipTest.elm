module Forth.Geometry.FlipTest exposing (..)

import Expect
import Forth.Geometry.Flip exposing (..)
import Test exposing (describe, test, Test)


suite : Test
suite =
    describe "Flip module"
        [ test "is true to yes" <|
            \_ ->
                isFlipped yes
                    |> Expect.equal True
        , test "is false to no" <|
            \_ ->
                isFlipped no
                    |> Expect.equal False
        , test "yes is not no" <|
            \_ ->
                Expect.notEqual yes no
        , test "toString yes" <|
            \_ ->
                Expect.equal "Flip@yes" (toString yes)
        , test "toString no" <|
            \_ ->
                Expect.equal "Flip@no" (toString no)
        ]
