module Compiler exposing (compile)

import Dir
import Joint
import Kind
import Rail exposing (Rail)
import Rot45
import Tie


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


compile : String -> List Rail
compile _ =
    test1
