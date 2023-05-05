module Forth.Interpreter exposing (execute)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint
import Forth.Geometry.Rot45 as Rot45
import Forth.Geometry.Tie as Tie exposing (Tie)
import Rail exposing (Rail(..))
import RailPlacement exposing (RailPlacement)


getLocalTie : Rail -> Tie
getLocalTie rail =
    case rail of
        Straight joint ->
            Tie.make (Rot45.make 1 0 0 0) Rot45.zero 0 Dir.e joint

        Right joint ->
            Tie.make (Rot45.make 0 0 1 -1) Rot45.zero 0 Dir.ne joint

        Left _ ->
            Debug.todo "branch 'Left _' not implemented"

        TurnoutLeft _ ->
            Debug.todo "branch 'TurnoutLeft _' not implemented"

        TurnoutRight _ ->
            Debug.todo "branch 'TurnoutRight _' not implemented"


getNextTie : Tie -> Rail -> Tie
getNextTie tie rail =
    let
        local =
            getLocalTie rail

        single2 =
            Rot45.add tie.single <|
                Rot45.mul (Dir.toRot45 tie.dir) local.single

        double2 =
            Rot45.add tie.double <|
                Rot45.mul (Dir.toRot45 tie.dir) local.double

        height2 =
            tie.height + local.height

        dir2 =
            Dir.mul tie.dir local.dir
    in
    Tie.make single2 double2 height2 dir2 Joint.Plus


tokenize : String -> List String
tokenize =
    String.words


execute : String -> List RailPlacement
execute src =
    let
        tokens =
            tokenize src
    in
    executeRec (Tie.make Rot45.zero Rot45.zero 0 Dir.e Joint.Plus) tokens


executeRec : Tie -> List String -> List RailPlacement
executeRec tie toks =
    case toks of
        [] ->
            []

        t :: ts ->
            case t of
                "s" ->
                    let
                        rail =
                            Rail.Straight tie.joint
                    in
                    RailPlacement.make rail (Tie.originToVec3 tie) (Dir.toRadian tie.dir)
                        :: executeRec (getNextTie tie rail) ts

                "l" ->
                    let
                        rail =
                            Rail.Left tie.joint
                    in
                    RailPlacement.make rail (Tie.originToVec3 tie) (Dir.toRadian tie.dir)
                        :: executeRec (getNextTie tie rail) ts

                "r" ->
                    let
                        rail =
                            Rail.Right tie.joint
                    in
                    RailPlacement.make rail (Tie.originToVec3 tie) (Dir.toRadian tie.dir)
                        :: executeRec (getNextTie tie rail) ts

                _ ->
                    executeRec tie ts
