module Rail exposing (..)

type RailType
    = Straight
    | Curve



straight =
    { railType = Straight
    , ends =
          [ End.make (RPoint.make 0 0 0 0) RDir.s RPole.plus
          , End.make (RPoint.make 0 0 1 0) RDir.s RPole.plus
          ]
    }