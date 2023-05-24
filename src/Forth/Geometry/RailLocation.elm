module Forth.Geometry.RailLocation exposing
    ( RailLocation
    , addHeight
    , flip
    , inv
    , invertJoint
    , make
    , mul
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
    { location : Location Dir8
    , joint : Joint
    }


make : Rot45 -> Rot45 -> Int -> Dir8 -> Joint -> RailLocation
make single double height dir joint =
    { location = Location.make single double height dir
    , joint = joint
    }


zero : RailLocation
zero =
    make Rot45.zero Rot45.zero 0 Dir8.e Joint.Minus


invertJoint : RailLocation -> RailLocation
invertJoint loc =
    { loc | joint = Joint.invert loc.joint }


flip : RailLocation -> RailLocation
flip loc =
    { loc | location = Location.flip Dir8.class loc.location }


mul : RailLocation -> RailLocation -> RailLocation
mul global local =
    { location = Location.mul Dir8.class global.location local.location
    , joint = local.joint
    }


inv : RailLocation -> RailLocation
inv loc =
    { location = Location.inv Dir8.class loc.location
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
