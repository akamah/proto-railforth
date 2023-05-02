module Placement exposing
    ( Placement
    , curveLeft
    , straightPlus
    )

import Flip exposing (Flip)
import Joint exposing (Joint)
import Shape exposing (Shape(..))


type alias Placement =
    { shape : Shape
    , joint : Joint
    , flip : Flip
    }


straightPlus : Placement
straightPlus =
    { shape = Straight
    , joint = Joint.minus
    , flip = Flip.no
    }


curveLeft : Placement
curveLeft =
    { shape = Curve
    , joint = Joint.minus
    , flip = Flip.no
    }
