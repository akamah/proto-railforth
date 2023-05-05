module Forth.Geometry.Location exposing (Location, make, originToVec3)

import Forth.Geometry.Dir exposing (Dir)
import Forth.Geometry.Joint exposing (Joint)
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Math.Vector3 as Vec3 exposing (Vec3)


type alias Height =
    Int


{-| レールの端点を表現する。ここで言う端点とは、設置されたレールの端っこが持ちうる情報である。
平面上の点（単線基準、複線基準）、高さ、向いている方向、および凹凸を持つ。
-}
type alias Location =
    { single : Rot45
    , double : Rot45
    , height : Height
    , dir : Dir
    , joint : Joint
    }


make : Rot45 -> Rot45 -> Height -> Dir -> Joint -> Location
make single double height dir joint =
    { single = single
    , double = double
    , height = height
    , dir = dir
    , joint = joint
    }


originToVec3 : Location -> Vec3
originToVec3 tie =
    let
        singleUnit =
            54

        doubleUnit =
            60

        heightUnit =
            16.5

        ( sx, sy ) =
            Rot45.toFloat tie.single

        ( dx, dy ) =
            Rot45.toFloat tie.double

        h =
            Basics.toFloat tie.height
    in
    Vec3.vec3
        (singleUnit * sx + doubleUnit * dx)
        (heightUnit * h)
        -(singleUnit * sy + doubleUnit * dy)
