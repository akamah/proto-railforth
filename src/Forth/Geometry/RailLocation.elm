module Forth.Geometry.RailLocation exposing
    ( RailLocation
    , div
    , flip
    , invert
    , make
    , mul
    , negate
    , originToVec3
    , zero
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
type alias RailLocation =
    { single : Rot45
    , double : Rot45
    , height : Height
    , dir : Dir
    , joint : Joint
    }


make : Rot45 -> Rot45 -> Height -> Dir -> Joint -> RailLocation
make single double height dir joint =
    { single = single
    , double = double
    , height = height
    , dir = dir
    , joint = joint
    }


zero : RailLocation
zero =
    make Rot45.zero Rot45.zero 0 Dir.e Joint.Minus


invert : RailLocation -> RailLocation
invert loc =
    { loc | joint = Joint.invert loc.joint }


flip : RailLocation -> RailLocation
flip loc =
    { loc
        | single = Rot45.conj loc.single
        , double = Rot45.conj loc.double
        , height = -loc.height
        , dir = Dir.inv loc.dir
    }


mul : RailLocation -> RailLocation -> RailLocation
mul global local =
    let
        dirRot =
            Dir.toRot45 global.dir

        single =
            Rot45.add global.single <|
                Rot45.mul dirRot local.single

        double =
            Rot45.add global.double <|
                Rot45.mul dirRot local.double

        height =
            local.height + global.height

        dir =
            Dir.mul local.dir global.dir
    in
    make single double height dir local.joint


negate : RailLocation -> RailLocation
negate loc =
    let
        flipDir =
            Dir.inv loc.dir

        flipDirRot45 =
            Dir.toRot45 flipDir
    in
    make
        (Rot45.mul flipDirRot45 (Rot45.negate loc.single))
        (Rot45.mul flipDirRot45 (Rot45.negate loc.double))
        -loc.height
        flipDir
        loc.joint


div : RailLocation -> RailLocation -> RailLocation
div x y =
    mul x (negate y)


originToVec3 : RailLocation -> Vec3
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