module RailTest exposing (suite)

import Expect exposing (FloatingPointTolerance(..))
import Rail exposing (..)
import Test exposing (..)


suite : Test
suite =
    describe "Rail module"
        [ describe "canInvert" <|
            [ test "AutoTurnout rail cannot invert" <|
                \_ ->
                    Expect.equal
                        False
                        (canInvert AutoTurnout)
            , test "Straight4 rail can invert" <|
                \_ ->
                    Expect.equal
                        True
                        (canInvert <| Straight4 ())
            ]
        ]
