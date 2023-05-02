module Kind exposing
    ( Kind(..)
    , allKinds
    )


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
