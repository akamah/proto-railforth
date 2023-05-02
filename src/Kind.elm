module Kind exposing
    ( Kind(..)
    , allKinds
    )

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
