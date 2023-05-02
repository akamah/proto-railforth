module Kind exposing
    ( Kind(..)
    , allKinds
    )

import Tie exposing (Tie)


type Kind
    = Straight
    | CurveRight
    | CurveLeft


allKinds : List Kind
allKinds =
    [ Straight
    , CurveRight
    , CurveLeft
    ]


getLocalTies : Kind -> List Tie
getLocalTies _ =
    []
