module Forth.Geometry.Dir exposing (..)

import Forth.Geometry.Rot45 as Rot45 exposing (Rot45)


type alias DirClass a =
    { unit : a
    , mul : a -> a -> a
    , inv : a -> a
    , toRot45 : a -> Rot45
    }


unitClass : DirClass ()
unitClass =
    { unit = ()
    , mul = \_ _ -> ()
    , inv = \_ -> ()
    , toRot45 = \_ -> Rot45.one
    }
