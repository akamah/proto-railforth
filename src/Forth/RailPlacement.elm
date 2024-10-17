module Forth.RailPlacement exposing
    ( RailPlacement
    , toRailRenderData
    )

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Location as Location exposing (Location)
import Types.Rail exposing (IsFlipped, IsInverted, Rail)
import Types.RailRenderData exposing (RailRenderData)


{-| あるレールをどこに配置するかを持たせたデータ型。
この型があったら次に繋がる線路はどこに配置するべきか (RailPiece) とか、
レンダリングする際の必要なデータ (RailRenderData) を引けるようにしたい

RailLocationではなくLocationを持たせているのは、Rail型からoriginの極性が判明するため

-}
type alias RailPlacement =
    { rail : Rail IsInverted IsFlipped
    , location : Location
    }


toRailRenderData : RailPlacement -> RailRenderData
toRailRenderData placement =
    Types.RailRenderData.make placement.rail (Location.toVec3 placement.location) (Dir.toRadian placement.location.dir)
