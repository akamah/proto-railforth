module Types.RailTest exposing (suite)

import Expect exposing (FloatingPointTolerance(..))
import Test exposing (..)
import Types.Rail exposing (..)


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
        , describe "isInverted" <|
            [ test "Straight4 inverted ===> true" <|
                \_ ->
                    Expect.equal
                        True
                        (isInverted <| Straight4 Inverted)
            , test "Straight4 not inverted ==> false" <|
                \_ ->
                    Expect.equal
                        False
                        (isInverted <| Straight4 NotInverted)
            , test "Uturn ==> false" <|
                \_ ->
                    Expect.equal
                        False
                        (isInverted <| UTurn)
            ]
        ]
