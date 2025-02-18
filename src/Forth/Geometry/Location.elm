module Forth.Geometry.Location exposing
    ( Location
    , addHeight
    , compare
    , flip
    , inv
    , make
    , moveLeftByDoubleTrackLength
    , moveRightByDoubleTrackLength
    , mul
    , setHeight
    , toVec3
    )

import Forth.Geometry.Dir as Dir exposing (Dir)
import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)
import Math.Vector3 as Vec3 exposing (Vec3)
import Util exposing (lexicographic)


{-| 3次元空間上での点と向きを表現する。
-}
type alias Location =
    { single : Rot45
    , double : Rot45
    , height : Int
    , dir : Dir
    }


make : Rot45 -> Rot45 -> Int -> Dir -> Location
make single double height dir =
    { single = single
    , double = double
    , height = height
    , dir = dir
    }


flip : Location -> Location
flip loc =
    { single = Rot45.conj loc.single
    , double = Rot45.conj loc.double
    , height = -loc.height
    , dir = Dir.inv loc.dir
    }


mul : Location -> Location -> Location
mul global local =
    let
        single =
            Rot45.add global.single <|
                Rot45.mul (Dir.toRot45 global.dir) local.single

        double =
            Rot45.add global.double <|
                Rot45.mul (Dir.toRot45 global.dir) local.double

        dir =
            Dir.mul local.dir global.dir
    in
    { single = single
    , double = double
    , height = global.height + local.height
    , dir = dir
    }


inv : Location -> Location
inv x =
    let
        invDir =
            Dir.inv x.dir

        invDirRot =
            Dir.toRot45 invDir

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


setHeight : Int -> Location -> Location
setHeight newHeight location =
    { location | height = newHeight }


addHeight : Int -> Location -> Location
addHeight diffHeight location =
    { location | height = location.height + diffHeight }


moveLeftByDoubleTrackLength : Location -> Location
moveLeftByDoubleTrackLength loc =
    mul loc <|
        make Rot45.zero (Rot45.add (Dir.toRot45 Dir.n) (Dir.toRot45 Dir.n)) 0 Dir.e


moveRightByDoubleTrackLength : Location -> Location
moveRightByDoubleTrackLength loc =
    mul loc <|
        make Rot45.zero (Rot45.add (Dir.toRot45 Dir.s) (Dir.toRot45 Dir.s)) 0 Dir.e


toVec3 : Location -> Vec3
toVec3 tie =
    let
        singleUnit =
            27

        doubleUnit =
            30

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
        (singleUnit * sy + doubleUnit * dy)
        (heightUnit * h)


compare : Location -> Location -> Order
compare a b =
    lexicographic (Rot45.compare a.single b.single) <|
        lexicographic (Rot45.compare a.double b.double) <|
            lexicographic (Basics.compare a.height b.height) <|
                Dir.compare a.dir b.dir
