module Rail exposing (Rail, make)

import Kind exposing (Kind)
import Tie exposing (Tie)


type alias Rail =
    { kind : Kind
    , origin : Tie
    }


make : Kind -> Tie -> Rail
make kind origin =
    { kind = kind
    , origin = origin
    }
