module Placement exposing
    ( Placement
    , curveLeft
    , straightPlus
    , turnoutLeftPlus
    )

import Forth.Geometry.Flip as Flip exposing (Flip)
import Forth.Geometry.Joint as Joint exposing (Joint)
import Shape exposing (Shape(..))


{-| ある点における、レールの配置を表す。

  - レールの形
  - その点における凹凸（どっちがどっちかは後述する）
  - レールが反転しているかどうか

-}
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


turnoutLeftPlus : Placement
turnoutLeftPlus =
    { shape = Turnout
    , joint = Joint.minus
    , flip = Flip.no
    }


{-| for map key
-}
toString : Placement -> String
toString placement =
    String.join "+"
        [ Shape.toString placement.shape
        , Joint.toString placement.joint
        , Flip.toString placement.flip
        ]
