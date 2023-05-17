module Forth.Geometry.Location exposing
    ( Location
    , add
    , addHeight
    , flip
    , make
    , mul
    , negate
    , setHeight
    , toVec3
    , zero
    )

import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Math.Vector3 as Vec3 exposing (Vec3)


{-| 3次元空間上での点を表現する
-}
type alias Location =
    { single : Rot45
    , double : Rot45
    , height : Int
    }


make : Rot45 -> Rot45 -> Int -> Location
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


add : Location -> Location -> Location
add x y =
    make
        (Rot45.add x.single y.single)
        (Rot45.add x.double y.double)
        (x.height + y.height)


negate : Location -> Location
negate x =
    make
        (Rot45.negate x.single)
        (Rot45.negate x.double)
        -x.height


mul : Rot45 -> Location -> Location
mul rot loc =
    make
        (Rot45.mul rot loc.single)
        (Rot45.mul rot loc.double)
        loc.height


setHeight : Int -> Location -> Location
setHeight newHeight location =
    { location | height = newHeight }


addHeight : Int -> Location -> Location
addHeight diffHeight location =
    { location | height = location.height + diffHeight }


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
