module Forth.Geometry.PierLocation exposing
    ( PierLocation
    , PierMargin
    , flatRailMargin
    , flip
    , fromRailLocation
    , slopeCurveMargin
    , toVec3
    )

import Forth.Geometry.Dir4 as Dir4 exposing (Dir4)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.RailLocation exposing (RailLocation)
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Math.Vector3 exposing (Vec3)


{-| 橋脚の設置地点を表す。
-}
type alias PierLocation =
    { location : Location
    , dir : Dir4
    , margin : PierMargin
    }


{-| ある橋脚設置地点について、上方向と下方向でさらに橋脚の設置点があってはならない空間がある。
例えば、あるレールの上にブロック橋脚を設置すると考えるとき、必ずミニ橋脚4個以上のマージンが必要となる。
また、坂曲線レールのようなものを設置する場合は、下に1つ分のマージンが必要になる。
-}
type alias PierMargin =
    { top : Int
    , bottom : Int
    }


flatRailMargin : PierMargin
flatRailMargin =
    { top = 4
    , bottom = 0
    }


slopeCurveMargin : PierMargin
slopeCurveMargin =
    { top = 4
    , bottom = 1
    }


make : Rot45 -> Rot45 -> Int -> Dir4 -> Int -> Int -> PierLocation
make single double height dir4 top bottom =
    { location = Location.make single double height
    , dir = dir4
    , margin = { top = top, bottom = bottom }
    }


fromRailLocation : RailLocation -> PierMargin -> PierLocation
fromRailLocation loc margin =
    { location = loc.location
    , dir = Dir4.fromDir8 loc.dir
    , margin = margin
    }


flip : PierLocation -> PierLocation
flip loc =
    { loc
        | location = Location.flip loc.location
        , dir = Dir4.inv loc.dir
    }



-- moveLeftByDoubleTrackLength : PierLocation -> Location
-- moveLeftByDoubleTrackLength loc =
--     Location.add loc.location <|
--         Location.make Rot45.zero (Dir4.toRot45 (Dir4.mul loc.dir Dir4.n)) 0
-- mul : RailLocation -> RailLocation -> RailLocation
-- mul global local =
--     let
--         newLocation =
--             Location.add global.location <|
--                 Location.mul (Dir8.toRot45 global.dir) local.location
--         dir =
--             Dir8.mul local.dir global.dir
--     in
--     { location = newLocation
--     , dir = dir
--     , joint = local.joint
--     }


getDir4 : PierLocation -> Dir4
getDir4 loc =
    loc.dir


toVec3 : PierLocation -> Vec3
toVec3 loc =
    Location.toVec3 loc.location
