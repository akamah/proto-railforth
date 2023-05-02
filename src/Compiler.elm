module Compiler exposing (compile)

import Dir
import Joint
import Kind exposing (Kind(..))
import Rail exposing (Rail)
import Rot45
import Tie exposing (Tie)


test1 : List Rail
test1 =
    [ Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 0 Dir.e Joint.plus
    , Rail Kind.CurveLeft <|
        Tie.make (Rot45.make 1 0 0 0) Rot45.zero 0 Dir.e Joint.plus
    , Rail Kind.CurveLeft <|
        Tie.make (Rot45.make 1 0 1 -1) Rot45.zero 0 Dir.ne Joint.plus
    , Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 4 Dir.e Joint.plus
    , Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 8 Dir.e Joint.plus
    , Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 12 Dir.e Joint.plus
    , Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 16 Dir.e Joint.plus
    , Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 20 Dir.e Joint.plus
    , Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 24 Dir.e Joint.plus
    , Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 28 Dir.e Joint.plus
    , Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 32 Dir.e Joint.plus
    , Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 36 Dir.e Joint.plus
    , Rail Kind.Straight <|
        Tie.make Rot45.zero Rot45.zero 40 Dir.e Joint.plus
    ]


getLocalTie : Kind -> Tie
getLocalTie k =
    case k of
        Straight ->
            Tie.make (Rot45.make 1 0 0 0) Rot45.zero 0 Dir.e Joint.plus

        CurveLeft ->
            Tie.make (Rot45.make 0 0 1 -1) Rot45.zero 0 Dir.ne Joint.plus

        CurveRight ->
            Tie.make (Rot45.make 0 1 -1 0) Rot45.zero 0 Dir.se Joint.plus


goStraight : Tie -> Tie
goStraight tie =
    let
        sn =
            Rot45.add tie.single <| tie.dir
    in
    Tie.make sn tie.double tie.height tie.dir tie.joint


curveLeft : Tie -> Tie
curveLeft tie =
    let
        ns =
            Rot45.add tie.single <| Rot45.mul tie.dir (Rot45.make 0 0 1 -1)

        nd =
            Rot45.mul Dir.ne tie.dir
    in
    Tie.make ns tie.double tie.height nd tie.joint


getNextTie : Tie -> Kind -> Tie
getNextTie tie kind =
    let
        local =
            getLocalTie kind

        single2 =
            Rot45.add tie.single <| Rot45.mul tie.dir local.single

        double2 =
            Rot45.add tie.double <| Rot45.mul tie.dir local.double

        height2 =
            tie.height + local.height

        dir2 =
            Rot45.mul tie.dir local.dir

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
