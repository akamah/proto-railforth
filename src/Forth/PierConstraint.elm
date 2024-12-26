module Forth.PierConstraint exposing (..)

import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.PierLocation as PierLocation exposing (PierLocation)
import Types.Rail exposing (IsFlipped(..))



{- 橋脚の設置条件を表す。

   must : 必ず設置しなければならない。
   may : 設置してもしなくてもよい。複線橋脚を配置せざるを得ない際に使用。
   mustNot : 設置してはいけない。複線橋脚を設置してはいけない際に使用。
-}


type alias PierConstraint =
    { must : List PierLocation
    , may : List Location
    , mustNot : List Location
    }


append : PierConstraint -> PierConstraint -> PierConstraint
append x y =
    { must = x.must ++ y.must
    , may = x.may ++ y.may
    , mustNot = x.mustNot ++ y.mustNot
    }


concat : List PierConstraint -> PierConstraint
concat xs =
    { must = List.concat (List.map (\x -> x.must) xs)
    , may = List.concat (List.map (\x -> x.may) xs)
    , mustNot = List.concat (List.map (\x -> x.mustNot) xs)
    }


flip : IsFlipped -> PierConstraint -> PierConstraint
flip flipped constraint =
    case flipped of
        NotFlipped ->
            constraint

        Flipped ->
            { must = List.map PierLocation.flip constraint.must
            , may = List.map Location.flip constraint.may
            , mustNot = List.map Location.flip constraint.mustNot
            }
