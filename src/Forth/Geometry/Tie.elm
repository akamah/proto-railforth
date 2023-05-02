module Forth.Geometry.Tie exposing
    ( Tie
    , make
    )

import Forth.Geometry.Dir exposing (Dir)
import Forth.Geometry.Rot45 exposing (Rot45)


{-| レールの端点を表す。
原点（単線基準、複線基準）、高さ、向いている方向を持つ。
-}
type alias Tie =
    { single : Rot45
    , double : Rot45
    , height : Int
    , dir : Dir
    }


make : Rot45 -> Rot45 -> Int -> Dir -> Tie
make single double height dir =
    { single = single
    , double = double
    , height = height
    , dir = dir
    }