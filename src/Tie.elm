module Tie exposing
    ( Tie
    , make
    )

import Dir exposing (Dir)
import Rot45 exposing (Rot45)


{-| レールの端点を表す。
原点（単線基準、複線基準）、高さ、向いている方向、凹凸を持つ。
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
