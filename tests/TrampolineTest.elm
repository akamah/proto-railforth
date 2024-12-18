module TrampolineTest exposing (..)

import Expect exposing (FloatingPointTolerance(..))
import Test exposing (..)
import Trampoline exposing (..)


fact : Int -> Int -> Trampoline () Int
fact a n =
    if n == 0 then
        Done a

    else
        More <| \() -> fact (a * n) (n - 1)


plus : Int -> Int -> Trampoline () Int
plus x y =
    More (\_ -> Done (x + y))


mult : Int -> Int -> Trampoline e Int
mult x y =
    More (\_ -> Done (x * y))


tarai x y z =
    if x <= y then
        y

    else
        tarai (tarai (x - 1) y z) (tarai (y - 1) z x) (tarai (z - 1) x y)


ack m n =
    if m == 0 then
        Done (n + 1)

    else if n == 0 then
        More (\() -> ack (m - 1) 1)

    else
        More (\() -> ack m (n - 1)) |> andThen (\y -> More <| \() -> ack (m - 1) y)


suite : Test
suite =
    describe "Trampoline" <|
        [ test "run" <|
            \_ ->
                Expect.equal
                    (Ok 120)
                    (run <| fact 1 5)
        , test "compose" <|
            \_ ->
                Expect.equal
                    (Ok 10)
                    (run <| compose (plus 4) (mult 2) 1)
        , test "sequence" <|
            \_ ->
                Expect.equal
                    (Ok 12)
                    (run <| sequence [ plus 3, mult 3 ] 1)
        , test "tarai" <|
            \_ ->
                Expect.equal
                    12
                    (tarai 12 6 0)

        -- , test "ack" <|
        --     \_ ->
        --         Expect.equal
        --             (Ok 30)
        --             (run <| ack 4 1)
        ]
