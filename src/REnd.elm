module REnd exposing
    ( REnd
    , make
    )

{-
レールの端点を表す。
原点（単線基準、複線基準）、向いている方向、極を持つ。


-}

import RPoint exposing (RPoint)
import RDir exposing (RDir)
import RPole exposing (RPole)

type alias REnd =
    { single : RPoint
    , double : RPoint
    , dir : RDir
    , pole : RPole
    }

make : RPoint -> RPoint -> RDir -> RPole -> REnd
make single double dir pole =
    { single = single
    , double = double
    , dir = dir
    , pole = pole
    }
