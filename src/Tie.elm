module Tie exposing
    ( Tie
    , make
    )

import RDir exposing (RDir)
import RPole exposing (RPole)
import Rot45 exposing (Rot45)


{-| レールの端点を表す。
原点（単線基準、複線基準）、向いている方向、極を持つ。
-}
type alias Tie =
    { single : Rot45
    , double : Rot45
    , dir : RDir
    , pole : RPole
    }


make : Rot45 -> Rot45 -> RDir -> RPole -> Tie
make single double dir pole =
    { single = single
    , double = double
    , dir = dir
    , pole = pole
    }
