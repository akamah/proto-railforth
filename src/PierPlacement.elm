module PierPlacement exposing (PierPlacement, make)

import Forth.Pier exposing (Pier)
import Math.Vector3 exposing (Vec3)


type alias PierPlacement =
    { pier : Pier
    , position : Vec3
    , angle : Float
    }


make : Pier -> Vec3 -> Float -> PierPlacement
make pier position angle =
    { pier = pier
    , position = position
    , angle = angle
    }
