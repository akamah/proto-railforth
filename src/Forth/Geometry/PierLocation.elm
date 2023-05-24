module Forth.Geometry.PierLocation exposing
    ( PierLocation
    , PierMargin
    , flatRailMargin
    , flip
    , fromRailLocation
    , make
    , slopeCurveMargin
    , toVec3
    )

import Forth.Geometry.Dir4 as Dir4 exposing (Dir4)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.RailLocation exposing (RailLocation)
import Forth.Geometry.Rot45 exposing (Rot45)
import Math.Vector3 exposing (Vec3)


{-| 橋脚の設置地点を表す。
-}
type alias PierLocation =
    { location : Location Dir4
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
    { location = Location.make single double height dir4
    , margin = { top = top, bottom = bottom }
    }


fromRailLocation : RailLocation -> PierMargin -> PierLocation
fromRailLocation loc margin =
    { location = Location.mapDir Dir4.fromDir8 loc.location
    , margin = margin
    }


flip : PierLocation -> PierLocation
flip loc =
    { location = Location.flip Dir4.class loc.location
    , margin = loc.margin
    }



-- moveLeftByDoubleTrackLength : PierLocation -> Location
-- moveLeftByDoubleTrackLength loc =
--     Location.add loc.location <|
--         Location.make Rot45.zero (Dir4.toRot45 (Dir4.mul loc.dir Dir4.n)) 0
-- mul : PierLocation -> PierLocation -> PierLocation
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


toVec3 : PierLocation -> Vec3
toVec3 loc =
    Location.toVec3 loc.location
