module Forth.LocationDefinition exposing (..)

{- よく使う便利なLocationを記述。RailPieceDefinitionとPierConstraintDefinitionからしか使ってはならない。 -}

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Location as L exposing (Location)
import Forth.Geometry.Rot45 as R



-- 原点の部


{-| いわゆる原点
-}
zero : Location
zero =
    L.make R.zero R.zero 0 Dir.w


{-| 0から複線幅で左に、つまりNの方向に進んだ点
-}
zeroDoubleLeft : Location
zeroDoubleLeft =
    L.make R.zero (R.make 0 0 2 0) 0 Dir.w


zeroDoubleRight : Location
zeroDoubleRight =
    L.make R.zero (R.make 0 0 -2 0) 0 Dir.w


{-| 0から1/2直線の長さでで左に、つまりNの方向に進んだ点
-}
zeroWideLeft : Location
zeroWideLeft =
    L.make (R.make 0 0 4 0) R.zero 0 Dir.w


zeroWideRight : Location
zeroWideRight =
    L.make (R.make 0 0 -4 0) R.zero 0 Dir.w



-- 直線の部


{-| 直線レールが進んだ先。 nはレールの名前で呼ぶ。つまり、1/4直線なら1, 2倍直線なら8で。
-}
straight : Int -> Location
straight n =
    L.make (R.make (2 * n) 0 0 0) R.zero 0 Dir.e


straightDoubleLeft : Int -> Location
straightDoubleLeft n =
    L.make (R.make (2 * n) 0 0 0) (R.make 0 0 2 0) 0 Dir.e


straightDoubleRight : Int -> Location
straightDoubleRight n =
    L.make (R.make (2 * n) 0 0 0) (R.make 0 0 -2 0) 0 Dir.e


straightWideLeft : Int -> Location
straightWideLeft n =
    L.make (R.make (2 * n) 0 4 0) R.zero 0 Dir.e


straightWideRight : Int -> Location
straightWideRight n =
    L.make (R.make (2 * n) 0 -4 0) R.zero 0 Dir.e



-- 曲線の部


left45 : Location
left45 =
    L.make (R.make 0 0 8 -8) R.zero 0 Dir.ne


right45 : Location
right45 =
    L.make (R.make 0 8 -8 0) R.zero 0 Dir.se


left90 : Location
left90 =
    L.make (R.make 8 0 8 0) R.zero 0 Dir.n


right90 : Location
right90 =
    L.make (R.make 8 0 -8 0) R.zero 0 Dir.s


outerLeft45 : Location
outerLeft45 =
    L.make (R.make 0 0 8 -8) (R.make 0 0 2 -2) 0 Dir.ne


outerRight45 : Location
outerRight45 =
    L.make (R.make 0 8 -8 0) (R.make 0 2 -2 0) 0 Dir.se



-- 複合形の部


{-| nだけ直進してから曲がる
-}
straightAndLeft45 : Int -> Location
straightAndLeft45 n =
    L.make (R.make (2 * n) 0 8 -8) R.zero 0 Dir.ne


straightAndRight45 : Int -> Location
straightAndRight45 n =
    L.make (R.make (2 * n) 8 -8 0) R.zero 0 Dir.se


{-| 複線曲線レールの外側の先の座標
-}
doubleLeftAndOuterLeft45 : Location
doubleLeftAndOuterLeft45 =
    L.make (R.make 0 0 8 -8) (R.make 0 0 0 -2) 0 Dir.ne


doubleLeftAndOuterRight45 : Location
doubleLeftAndOuterRight45 =
    L.make (R.make 0 8 -8 0) (R.make 0 0 0 2) 0 Dir.se
