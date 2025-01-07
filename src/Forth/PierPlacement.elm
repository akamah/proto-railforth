module Forth.PierPlacement exposing (PierPlacement, compare, make, toPierRenderData)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Location as Location exposing (Location)
import Types.Pier as Pier exposing (Pier)
import Types.PierRenderData exposing (PierRenderData)
import Util exposing (lexicographic)


{-| ある橋脚をどこに配置するかを持たせたデータ型。
-}
type alias PierPlacement =
    { pier : Pier
    , location : Location
    }


make : Pier -> Location -> PierPlacement
make =
    PierPlacement


toPierRenderData : PierPlacement -> PierRenderData
toPierRenderData placement =
    Types.PierRenderData.make placement.pier (Location.toVec3 placement.location) (Dir.toRadian placement.location.dir)


compare : PierPlacement -> PierPlacement -> Order
compare a b =
    lexicographic (Location.compare a.location b.location) (Pier.compare a.pier b.pier)
