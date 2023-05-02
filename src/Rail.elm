module Rail exposing (Rail, make)

import Dir
import Joint
import Kind exposing (Kind)
import Rot45
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
