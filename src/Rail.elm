module Rail exposing (..)

import RDir
import RPoint
import RPole
import Tie exposing (Tie)


type Kind
    = Straight
    | Curve


allKinds : List Kind
allKinds =
    [ Straight
    , Curve
    ]


straight =
    { kind = Straight
    , ends =
        [ Tie.make (RPoint.make 0 0 0 0) RPoint.zero RDir.s RPole.plus
        , Tie.make (RPoint.make 0 0 1 0) RPoint.zero RDir.s RPole.plus
        ]
    }


isReversible : Kind -> Bool
isReversible _ =
    False


getLocalTies : Kind -> List Tie
getLocalTies _ =
    []


type alias Rail =
    { kind : Kind
    , origin : Tie
    }
