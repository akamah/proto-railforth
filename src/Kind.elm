module Kind exposing (..)

import Dir
import Joint
import Rot45
import Tie exposing (Tie)


type Kind
    = Straight
    | Curve


allKinds : List Kind
allKinds =
    [ Straight
    , Curve
    ]


getLocalTies : Kind -> List Tie
getLocalTies _ =
    []
