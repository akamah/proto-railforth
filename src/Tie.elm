module Tie exposing
    ( Tie
    , make
    )

{-
   レールの端点を表す。
   原点（単線基準、複線基準）、向いている方向、極を持つ。


-}

import RDir exposing (RDir)
import RPoint exposing (RPoint)
import RPole exposing (RPole)


type alias Tie =
    { single : RPoint
    , double : RPoint
    , dir : RDir
    , pole : RPole
    }


make : RPoint -> RPoint -> RDir -> RPole -> Tie
make single double dir pole =
    { single = single
    , double = double
    , dir = dir
    , pole = pole
    }
