module Rail exposing (Rail(..), toString)

import Forth.Geometry.Joint exposing (Joint)


type Rail
    = Straight Joint
    | Left Joint
    | Right Joint
    | TurnoutLeft Joint
    | TurnoutRight Joint


{-| for map key
-}
toString : Rail -> String
toString placement =
    case placement of
        Straight joint ->
            ""

        Left joint ->
            ""

        Right joint ->
            ""

        TurnoutLeft _ ->
            Debug.todo "branch 'TurnoutLeft _' not implemented"

        TurnoutRight _ ->
            Debug.todo "branch 'TurnoutRight _' not implemented"
