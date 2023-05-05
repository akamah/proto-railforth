module Forth.Interpreter exposing (execute)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint
import Forth.Geometry.Rot45 as Rot45
import Forth.Geometry.Tie as Tie exposing (Tie)
import Rail exposing (IsFlipped(..), IsInverted, Rail(..))
import RailPlacement exposing (RailPlacement)


getLocalTie : Rail IsInverted IsFlipped -> Tie
getLocalTie rail =
    case rail of
        Straight ->
            Tie.make (Rot45.make 4 0 0 0) Rot45.zero 0 Dir.e Joint.Plus

        Curve NotFlipped ->
            Tie.make (Rot45.make 0 0 4 -4) Rot45.zero 0 Dir.ne Joint.Plus

        Curve Flipped ->
            Tie.make (Rot45.make 0 4 -4 0) Rot45.zero 0 Dir.se Joint.Plus

        _ ->
            Debug.todo "getLocalTie turnout"


getNextTie : Tie -> Rail IsInverted IsFlipped -> Tie
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
    Debug.log "tie" (Tie.make single2 double2 height2 dir2 Joint.Plus)


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
                            Straight
                    in
                    RailPlacement.make rail (Tie.originToVec3 tie) (Dir.toRadian tie.dir)
                        :: executeRec (getNextTie tie rail) ts

                "l" ->
                    let
                        rail =
                            Curve NotFlipped
                    in
                    RailPlacement.make rail (Tie.originToVec3 tie) (Dir.toRadian tie.dir)
                        :: executeRec (getNextTie tie rail) ts

                "r" ->
                    let
                        rail =
                            Curve Flipped
                    in
                    RailPlacement.make rail (Tie.originToVec3 tie) (Dir.toRadian tie.dir)
                        :: executeRec (getNextTie tie rail) ts

                _ ->
                    executeRec tie ts
