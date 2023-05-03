module Shape exposing (dummy)

{-| ひっくり返すか、およびレールの凹凸にこだわらず、レールの形そのものを記述する値。
-}


type Shape
    = Straight
    | Curve
    | TurnoutLeft
    | TurnoutRight


dummy : String
dummy =
    "Hoge"


toString : Shape -> String
toString shape =
    case shape of
        Straight ->
            "straight"

        Curve ->
            "curve"

        TurnoutLeft ->
            "turnout"

        TurnoutRight ->
            "turnout"
