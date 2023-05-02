module FlipTest exposing (..)

import Expect exposing (Expectation)
import Flip exposing (..)
import Fuzz exposing (Fuzzer, int, list, string)
import Test exposing (..)


suite : Test
suite =
    describe "Flip module"
        [ test "is true to yes" <|
            \_ ->
                isFlipped yes
                    |> Expect.true "isFlipped yes"
        , test "is false to no" <|
            \_ ->
                isFlipped no
                    |> Expect.false "isFlipped no"
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
