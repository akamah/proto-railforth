module Forth.Geometry.PierLocation exposing
    ( PierLocation
    , PierMargin
    , flatRailMargin
    , flip
    , fromRailLocation
    , make
    , mul
    , setHeight
    , slopeCurveMargin
    , toVec3
    )

import Forth.Geometry.Dir exposing (Dir)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.RailLocation exposing (RailLocation)
import Forth.Geometry.Rot45 exposing (Rot45)
import Math.Vector3 exposing (Vec3)


{-| 橋脚の設置地点を表す。
-}
type alias PierLocation =
    { location : Location
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


make : Rot45 -> Rot45 -> Int -> Dir -> PierMargin -> PierLocation
make single double height dir4 margin =
    { location = Location.make single double height dir4
    , margin = margin
    }


fromRailLocation : PierMargin -> RailLocation -> PierLocation
fromRailLocation margin loc =
    { location = loc.location
    , margin = margin
    }


flip : PierLocation -> PierLocation
flip loc =
    { location = Location.flip loc.location
    , margin = loc.margin
    }


setHeight : Int -> PierLocation -> PierLocation
setHeight newHeight loc =
    { loc | location = Location.setHeight newHeight loc.location }



-- moveLeftByDoubleTrackLength : PierLocation -> Location
-- moveLeftByDoubleTrackLength loc =
--     Location.add loc.location <|
--         Location.make Rot45.zero (Dir4.toRot45 (Dir4.mul loc.dir Dir4.n)) 0


mul : Location -> PierLocation -> PierLocation
mul global local =
    { location = Location.mul global local.location
    , margin = local.margin
    }


toVec3 : PierLocation -> Vec3
toVec3 loc =
    Location.toVec3 loc.location
