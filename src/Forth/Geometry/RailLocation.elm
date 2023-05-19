module Forth.Geometry.RailLocation exposing
    ( RailLocation
    , addHeight
    , flip
    , invert
    , make
    , mul
    , negate
    , setHeight
    , setJoint
    , toVec3
    , zero
    )

import Forth.Geometry.Dir8 as Dir8 exposing (Dir8)
import Forth.Geometry.Joint as Joint exposing (Joint)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Math.Vector3 exposing (Vec3)


{-| レールの端点を表現する。ここで言う端点とは、設置されたレールの端っこが持ちうる情報である。
平面上の点（単線基準、複線基準）、高さ、向いている方向、および凹凸を持つ。
-}
type alias RailLocation =
    { location : Location
    , dir : Dir8
    , joint : Joint
    }


make : Rot45 -> Rot45 -> Int -> Dir8 -> Joint -> RailLocation
make single double height dir joint =
    { location = Location.make single double height
    , dir = dir
    , joint = joint
    }


zero : RailLocation
zero =
    make Rot45.zero Rot45.zero 0 Dir8.e Joint.Minus


invert : RailLocation -> RailLocation
invert loc =
    { loc | joint = Joint.invert loc.joint }


flip : RailLocation -> RailLocation
flip loc =
    { loc
        | location = Location.flip loc.location
        , dir = Dir8.inv loc.dir
    }


mul : RailLocation -> RailLocation -> RailLocation
mul global local =
    let
        newLocation =
            Location.add global.location <|
                Location.mul (Dir8.toRot45 global.dir) local.location

        dir =
            Dir8.mul local.dir global.dir
    in
    { location = newLocation
    , dir = dir
    , joint = local.joint
    }


negate : RailLocation -> RailLocation
negate loc =
    let
        flipDir =
            Dir8.inv loc.dir

        newLocation =
            Location.mul (Dir8.toRot45 flipDir) (Location.negate loc.location)
    in
    { location = newLocation
    , dir = flipDir
    , joint = loc.joint
    }


setHeight : Int -> RailLocation -> RailLocation
setHeight newHeight railLocation =
    { railLocation | location = Location.setHeight newHeight railLocation.location }


addHeight : Int -> RailLocation -> RailLocation
addHeight diffHeight railLocation =
    { railLocation | location = Location.addHeight diffHeight railLocation.location }


setJoint : Joint -> RailLocation -> RailLocation
setJoint newJoint railLocation =
    { railLocation | joint = newJoint }


toVec3 : RailLocation -> Vec3
toVec3 loc =
    Location.toVec3 loc.location
