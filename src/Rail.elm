module Rail exposing (Rail, make)

import Placement exposing (Placement)
import Tie exposing (Tie)


type alias Rail =
    { placement : Placement
    , origin : Tie
    }


make : Placement -> Tie -> Rail
make placement origin =
    { placement = placement
    , origin = origin
    }
