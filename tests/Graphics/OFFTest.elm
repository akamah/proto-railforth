module Graphics.OFFTest exposing (..)

import Expect exposing (FloatingPointTolerance(..))
import Graphics.OFF as OFF
import Math.Vector3 exposing (vec3)
import Test exposing (..)


suite : Test
suite =
    describe "OFF"
        [ test "parse empty OFF file" <|
            \_ ->
                Expect.equal
                    (Ok { vertices = [], indices = [] })
                    (OFF.parse <|
                        String.join "\n"
                            [ "OFF 0 0 0"
                            ]
                    )
        , test "parse triangle" <|
            \_ ->
                Expect.equal
                    (Ok
                        { vertices =
                            [ vec3 0 0 0
                            , vec3 -1 0 0
                            , vec3 0 1 0
                            , vec3 0 0 1
                            ]
                        , indices =
                            [ ( 0, 1, 2 )
                            , ( 0, 1, 3 )
                            , ( 1, 2, 3 )
                            , ( 2, 0, 3 )
                            ]
                        }
                    )
                    (OFF.parse <|
                        String.join "\n"
                            [ "OFF 4 4 6"
                            , "0 0 0"
                            , "-1 0 0"
                            , "0 1 0"
                            , "0 0 1"
                            , "3 0 1 2"
                            , "3 0 1 3"
                            , "3 1 2 3"
                            , "3 2 0 3"
                            ]
                    )
        , test "parse triangle but nv and nf are in the next line" <|
            \_ ->
                Expect.equal
                    (Ok
                        { vertices =
                            [ vec3 0 0 0
                            , vec3 1 0 0
                            , vec3 0 1 0
                            , vec3 0 0 1
                            ]
                        , indices =
                            [ ( 0, 1, 2 )
                            , ( 0, 1, 3 )
                            , ( 1, 2, 3 )
                            , ( 2, 0, 3 )
                            ]
                        }
                    )
                    (OFF.parse <|
                        String.join "\n"
                            [ "OFF"
                            , "4 4 6"
                            , "0 0 0"
                            , "1 0 0"
                            , "0 1 0"
                            , "0 0 1"
                            , "3 0 1 2"
                            , "3 0 1 3"
                            , "3 1 2 3"
                            , "3 2 0 3"
                            ]
                    )
        ]
