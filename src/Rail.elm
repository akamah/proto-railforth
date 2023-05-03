module Rail exposing (Rail, make)

import Forth.Geometry.Tie exposing (Tie)
import Placement exposing (Placement)


{-| 一本のレールを配置するのに十分な情報を持ったデータ型。
-}
type alias Rail =
    { placement : Placement
    , origin : Tie
    }


make : Placement -> Tie -> Rail
make placement origin =
    { placement = placement
    , origin = origin
    }
