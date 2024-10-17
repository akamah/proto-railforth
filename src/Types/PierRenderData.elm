module Types.PierRenderData exposing (PierRenderData, make)

import Math.Vector3 exposing (Vec3)
import Types.Pier exposing (Pier)


type alias PierRenderData =
    { pier : Pier
    , position : Vec3
    , angle : Float
    }


make : Pier -> Vec3 -> Float -> PierRenderData
make pier position angle =
    { pier = pier
    , position = position
    , angle = angle
    }
