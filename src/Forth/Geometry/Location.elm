module Forth.Geometry.Location exposing
    ( Location
    , flip
    , make
    , toVec3
    , zero
    )

import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Math.Vector3 as Vec3 exposing (Vec3)


type alias Height =
    Int


{-| 3次元空間上での点を表現する
-}
type alias Location =
    { single : Rot45
    , double : Rot45
    , height : Height
    }


make : Rot45 -> Rot45 -> Height -> Location
make single double height =
    { single = single
    , double = double
    , height = height
    }


zero : Location
zero =
    make Rot45.zero Rot45.zero 0


flip : Location -> Location
flip loc =
    { single = Rot45.conj loc.single
    , double = Rot45.conj loc.double
    , height = -loc.height
    }


toVec3 : Location -> Vec3
toVec3 tie =
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
