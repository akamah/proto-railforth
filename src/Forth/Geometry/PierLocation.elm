module Forth.Geometry.PierLocation exposing
    ( Dir4
    , PierLocation
    , toVec3
    )

import Forth.Geometry.Dir as Dir exposing (Dir)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Math.Vector3 exposing (Vec3)


{-| TODO: 本当は 東、北東、北、北西の4種類のみのデータ型がほしいが、いまのところスタブということで
-}
type alias Dir4 =
    Dir


{-| 橋脚の設置地点を表す。
-}
type alias PierLocation =
    { location : Location
    , dir : Dir4
    , spaceTop : Int
    , spaceBottom : Int
    }


make : Rot45 -> Rot45 -> Int -> Dir4 -> Int -> Int -> PierLocation
make single double height dir4 top bottom =
    { location = Location.make single double height
    , dir = dir4
    , spaceTop = top
    , spaceBottom = bottom
    }


moveLeftByDoubleTrackLength : PierLocation -> Location
moveLeftByDoubleTrackLength loc =
    Location.add loc.location <|
        Location.make Rot45.zero (Dir.toRot45 (Dir.mul loc.dir Dir.n)) 0



-- mul : RailLocation -> RailLocation -> RailLocation
-- mul global local =
--     let
--         newLocation =
--             Location.add global.location <|
--                 Location.mul (Dir.toRot45 global.dir) local.location
--         dir =
--             Dir.mul local.dir global.dir
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
