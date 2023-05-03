module Forth.Geometry.Tie exposing (Tie, make, originToVec3)

import Forth.Geometry.Dir exposing (Dir)
import Forth.Geometry.Joint exposing (Joint)
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Math.Vector3 as Vec3 exposing (Vec3)


{-| レールの端点を表す。
原点（単線基準、複線基準）、高さ、向いている方向、凹凸を持つ。
-}
type alias Tie =
    { single : Rot45
    , double : Rot45
    , height : Int
    , dir : Dir
    , joint : Joint
    }


make : Rot45 -> Rot45 -> Int -> Dir -> Joint -> Tie
make single double height dir joint =
    { single = single
    , double = double
    , height = height
    , dir = dir
    , joint = joint
    }



-- STUB!


originToVec3 : Tie -> Vec3
originToVec3 tie =
    let
        ( x, y ) =
            Rot45.toFloat tie.single
    in
    Vec3.vec3 x y (toFloat tie.height)
