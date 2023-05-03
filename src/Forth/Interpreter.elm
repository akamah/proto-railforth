module Forth.Interpreter exposing (execute)

import Forth.Geometry.Dir as Dir
import Placement exposing (Placement)
import Rail exposing (Rail)
import Forth.Geometry.Rot45 as Rot45
import Shape exposing (Shape(..))
import Forth.Geometry.Tie as Tie exposing (Tie)


getLocalTie : Placement -> Tie
getLocalTie p =
    case p.shape of
        Straight ->
            Tie.make (Rot45.make 1 0 0 0) Rot45.zero 0 Dir.e

        Curve ->
            Tie.make (Rot45.make 0 0 1 -1) Rot45.zero 0 Dir.ne

        Turnout ->
            -- Super stub!!!
            Tie.make (Rot45.make 1 0 0 0) Rot45.zero 0 Dir.e


getNextTie : Tie -> Placement -> Tie
getNextTie tie placement =
    let
        local =
            getLocalTie placement

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
    Tie.make single2 double2 height2 dir2


tokenize : String -> List String
tokenize =
    String.words


execute : String -> List Rail
execute src =
    let
        tokens =
            tokenize src
    in
    executeRec (Tie.make Rot45.zero Rot45.zero 0 Dir.e) tokens


executeRec : Tie -> List String -> List Rail
executeRec tie toks =
    case toks of
        [] ->
            []

        t :: ts ->
            case t of
                "s" ->
                    Rail.make Placement.straightPlus tie
                        :: executeRec (getNextTie tie Placement.straightPlus) ts

                "l" ->
                    Rail.make Placement.curveLeft tie
                        :: executeRec (getNextTie tie Placement.curveLeft) ts

                "tl" ->
                    Rail.make Placement.turnoutLeftPlus tie
                        :: executeRec (getNextTie tie Placement.turnoutLeftPlus) ts

                _ ->
                    []
