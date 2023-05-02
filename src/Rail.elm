module Rail exposing (..)

import REnd exposing (REnd)
import RPoint
import RDir
import RPole

type RType
    = Straight
    | Curve



straight =
    { railType = Straight
    , ends =
          [ REnd.make (RPoint.make 0 0 0 0) RPoint.zero RDir.s RPole.plus
          , REnd.make (RPoint.make 0 0 1 0) RPoint.zero RDir.s RPole.plus
          ]
    }

isReversible : RType -> Bool
isReversible _ =
    False

getLocalEnds : RType -> List REnd
getLocalEnds _ =
    []

type alias Rail =
    { railType : RType
    , origin : REnd
    }