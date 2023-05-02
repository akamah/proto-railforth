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


straight =
    { kind = Straight
    , ends =
        [ Tie.make Rot45.zero Rot45.zero Dir.s Joint.plus
        , Tie.make (Rot45.make 0 0 1 0) Rot45.zero Dir.s Joint.plus
        ]
    }
