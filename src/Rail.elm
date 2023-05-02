module Rail exposing (..)

type RType
    = Straight
    | Curve



straight =
    { railType = Straight
    , ends =
          [ End.make (RPoint.make 0 0 0 0) RDir.s RPole.plus
          , End.make (RPoint.make 0 0 1 0) RDir.s RPole.plus
          ]
    }

type alias Rail =
    { railType : RType
    , origin : End
    }