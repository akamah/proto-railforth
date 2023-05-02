module Shape exposing
    ( Shape(..)
    , toString
    )

{-| ひっくり返すか、およびレールの凹凸にこだわらず、レールの形そのものを記述する値。
-}


type Shape
    = Straight
    | Curve
    | Turnout


toString : Shape -> String
toString shape =
    case shape of
        Straight ->
            "straight"

        Curve ->
            "curve"

        Turnout ->
            "turnout"
