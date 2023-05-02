module Compiler exposing (compile)

import Dir
import Joint
import Kind exposing (Kind(..))
import Rail exposing (Rail)
import Rot45
import Tie exposing (Tie)


getLocalTie : Kind -> Tie
getLocalTie k =
    case k of
        Straight ->
            Tie.make (Rot45.make 1 0 0 0) Rot45.zero 0 Dir.e Joint.plus

        CurveLeft ->
            Tie.make (Rot45.make 0 0 1 -1) Rot45.zero 0 Dir.ne Joint.plus

        CurveRight ->
            Tie.make (Rot45.make 0 1 -1 0) Rot45.zero 0 Dir.se Joint.plus


getNextTie : Tie -> Kind -> Tie
getNextTie tie kind =
    let
        local =
            getLocalTie kind

        single2 =
            Rot45.add tie.single <| Rot45.mul (Dir.toRot45 tie.dir) local.single

        double2 =
            Rot45.add tie.double <| Rot45.mul (Dir.toRot45 tie.dir) local.double

        height2 =
            tie.height + local.height

        dir2 =
            Dir.mul tie.dir local.dir

        joint2 =
            Rot45.mul tie.joint local.joint
    in
    Tie.make single2 double2 height2 dir2 joint2


tokenize : String -> List String
tokenize =
    String.words


compile : String -> List Rail
compile src =
    let
        tokens =
            tokenize src
    in
    compileRec (Tie.make Rot45.zero Rot45.zero 0 Dir.e Joint.plus) tokens


compileRec : Tie -> List String -> List Rail
compileRec tie toks =
    case toks of
        [] ->
            []

        t :: ts ->
            case t of
                "s" ->
                    Rail.make Straight tie :: compileRec (getNextTie tie Straight) ts

                "l" ->
                    Rail.make CurveLeft tie :: compileRec (getNextTie tie CurveLeft) ts

                "r" ->
                    Rail.make CurveRight tie :: compileRec (getNextTie tie CurveRight) ts

                _ ->
                    []
