module Rail exposing (Rail)

import Kind exposing (Kind)
import Tie exposing (Tie)


type alias Rail =
    { kind : Kind
    , origin : Tie
    }
