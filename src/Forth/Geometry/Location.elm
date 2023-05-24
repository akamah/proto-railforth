module Forth.Geometry.Location exposing
    ( Location
    , addHeight
    , flip
    , inv
    , make
    , mapDir
    , mul
    , setHeight
    , toVec3
    )

import Forth.Geometry.Dir exposing (DirClass)
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Math.Vector3 as Vec3 exposing (Vec3)


{-| 3次元空間上での点を表現する。向きの情報がほしかったら型引数で指定する
-}
type alias Location dir =
    { single : Rot45
    , double : Rot45
    , height : Int
    , dir : dir
    }


make : Rot45 -> Rot45 -> Int -> dir -> Location dir
make single double height dir =
    { single = single
    , double = double
    , height = height
    , dir = dir
    }


flip : DirClass dir -> Location dir -> Location dir
flip class loc =
    { single = Rot45.conj loc.single
    , double = Rot45.conj loc.double
    , height = -loc.height
    , dir = class.inv loc.dir
    }


mul : DirClass dir -> Location dir -> Location dir -> Location dir
mul class global local =
    let
        single =
            Rot45.add global.single <|
                Rot45.mul (class.toRot45 global.dir) local.single

        double =
            Rot45.add global.double <|
                Rot45.mul (class.toRot45 global.dir) local.double

        dir =
            class.mul local.dir global.dir
    in
    { single = single
    , double = double
    , height = global.height + local.height
    , dir = dir
    }


inv : DirClass dir -> Location dir -> Location dir
inv class x =
    let
        invDir =
            class.inv x.dir

        invDirRot =
            class.toRot45 invDir

        single =
            Rot45.mul invDirRot (Rot45.negate x.single)

        double =
            Rot45.mul invDirRot (Rot45.negate x.double)
    in
    { single = single
    , double = double
    , height = -x.height
    , dir = invDir
    }


setHeight : Int -> Location d -> Location d
setHeight newHeight location =
    { location | height = newHeight }


addHeight : Int -> Location d -> Location d
addHeight diffHeight location =
    { location | height = location.height + diffHeight }


toVec3 : Location d -> Vec3
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


mapDir : (dir1 -> dir2) -> Location dir1 -> Location dir2
mapDir f loc =
    { single = loc.single
    , double = loc.double
    , height = loc.height
    , dir = f loc.dir
    }
