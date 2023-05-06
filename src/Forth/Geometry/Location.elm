module Forth.Geometry.Location exposing
    ( Location
    , extend
    , flip
    , invert
    , make
    , originToVec3
    )

import Forth.Geometry.Dir as Dir exposing (Dir)
import Forth.Geometry.Joint as Joint exposing (Joint)
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


invert : Location -> Location
invert loc =
    { loc | joint = Joint.invert loc.joint }


flip : Location -> Location
flip loc =
    { loc
        | single = Rot45.conj loc.single
        , double = Rot45.conj loc.double
        , height = -loc.height
        , dir = Dir.flip loc.dir
    }


extend : Location -> Location -> Location
extend global local =
    let
        single =
            Rot45.add global.single <|
                Rot45.mul (Dir.toRot45 global.dir) local.single

        double =
            Rot45.add global.double <|
                Rot45.mul (Dir.toRot45 global.dir) local.double

        height =
            global.height + local.height

        dir =
            Dir.mul global.dir local.dir
    in
    make single double height dir local.joint


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
