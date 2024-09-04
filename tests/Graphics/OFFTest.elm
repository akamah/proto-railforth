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
        , test "parse OFF file which specifies face with 4 vertices" <|
            \_ ->
                Expect.equal
                    (Ok
                        { vertices =
                            [ vec3 -15 -46 16
                            , vec3 15 -46 16
                            , vec3 15 46 16
                            , vec3 -15 46 16
                            , vec3 -15 46 0
                            , vec3 15 46 0
                            , vec3 15 -46 0
                            , vec3 -15 -46 0
                            ]
                        , indices =
                            [ ( 0, 1, 2 )
                            , ( 0, 2, 3 )
                            , ( 4, 5, 6 )
                            , ( 4, 6, 7 )
                            , ( 7, 6, 1 )
                            , ( 7, 1, 0 )
                            , ( 6, 5, 2 )
                            , ( 6, 2, 1 )
                            , ( 5, 4, 3 )
                            , ( 5, 3, 2 )
                            , ( 4, 7, 0 )
                            , ( 4, 0, 3 )
                            ]
                        }
                    )
                    (OFF.parse <|
                        String.join "\n"
                            [ "OFF 8 6 0"
                            , "-15 -46 16 "
                            , "15 -46 16 "
                            , "15 46 16 "
                            , "-15 46 16 "
                            , "-15 46 0 "
                            , "15 46 0 "
                            , "15 -46 0 "
                            , "-15 -46 0 "
                            , "4 0 1 2 3"
                            , "4 4 5 6 7"
                            , "4 7 6 1 0"
                            , "4 6 5 2 1"
                            , "4 5 4 3 2"
                            , "4 4 7 0 3"
                            ]
                    )
        ]
