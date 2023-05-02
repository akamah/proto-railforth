module Kind exposing (..)

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
        [ Tie (RPoint 0 0 0 0) RPoint.zero RDir.s RPole.plus
        , Tie (RPoint 0 0 1 0) RPoint.zero RDir.s RPole.plus
        ]
    }
