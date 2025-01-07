module Forth.Geometry.PierLocation exposing
    ( PierLocation
    , PierMargin
    , compare
    , flip
    , fromRailLocation
    , make
    , merge
    , mul
    , setHeight
    , sortAndMergePierLocations
    , toVec3
    )

import Forth.Geometry.Dir exposing (Dir)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.RailLocation exposing (RailLocation)
import Forth.Geometry.Rot45 exposing (Rot45)
import Http.Progress exposing (Progress(..))
import List.Nonempty as Nonempty exposing (Nonempty)
import Math.Vector3 exposing (Vec3)
import Util


{-| 橋脚の設置地点を表す。
-}
type alias PierLocation =
    { location : Location
    , margin : PierMargin
    }


{-| ある橋脚設置地点について、上方向と下方向でさらに橋脚の設置点があってはならない空間がある。
例えば、あるレールの上にブロック橋脚を設置すると考えるとき、必ずミニ橋脚4個以上のマージンが必要となる。
また、坂曲線レールのようなものを設置する場合は、下に1つ分のマージンが必要になる。
-}
type alias PierMargin =
    { top : Int
    , bottom : Int
    }


make : Rot45 -> Rot45 -> Int -> Dir -> PierMargin -> PierLocation
make single double height dir4 margin =
    { location = Location.make single double height dir4
    , margin = margin
    }


fromRailLocation : PierMargin -> RailLocation -> PierLocation
fromRailLocation margin loc =
    { location = loc.location
    , margin = margin
    }


flip : PierLocation -> PierLocation
flip loc =
    { location = Location.flip loc.location
    , margin = loc.margin
    }


setHeight : Int -> PierLocation -> PierLocation
setHeight newHeight loc =
    { loc | location = Location.setHeight newHeight loc.location }


mul : Location -> PierLocation -> PierLocation
mul global local =
    { location = Location.mul global local.location
    , margin = local.margin
    }


toVec3 : PierLocation -> Vec3
toVec3 loc =
    Location.toVec3 loc.location


{-| 2つのPierLocationを合成させる。マージンのtop, bottomについて共に大きい方を取る。
locationは同一だと仮定する。そうでない場合の動作は未定義
-}
merge : PierLocation -> PierLocation -> PierLocation
merge x y =
    PierLocation x.location
        { top = max x.margin.top y.margin.top
        , bottom = max x.margin.bottom y.margin.bottom
        }


compare : PierLocation -> PierLocation -> Order
compare x y =
    Util.lexicographic (Location.compare x.location y.location) <|
        Util.lexicographic (Basics.compare x.margin.top y.margin.top)
            (Basics.compare x.margin.bottom y.margin.bottom)


{-| 隣り合う要素をマージしていく。
平面的な座標に関しては全て同じになっていると仮定する。
さらに、高さの昇順で並んでいるとする。
また、同じ高さに3つ以上あったとしても処理を継続するものとする。
-}
mergePierLocations : Nonempty PierLocation -> Nonempty PierLocation
mergePierLocations list =
    let
        rec accum prev ls =
            case ls of
                [] ->
                    Nonempty.reverse <| Nonempty.Nonempty prev accum

                l :: rest ->
                    if prev.location.height == l.location.height then
                        rec accum (merge prev l) rest

                    else
                        rec (prev :: accum) l rest
    in
    rec [] (Nonempty.head list) (Nonempty.tail list)


sortPierLocations : Nonempty PierLocation -> Nonempty PierLocation
sortPierLocations =
    Nonempty.sortWith compare


sortAndMergePierLocations : Nonempty PierLocation -> Nonempty PierLocation
sortAndMergePierLocations =
    sortPierLocations >> mergePierLocations
