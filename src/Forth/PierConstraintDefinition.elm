module Forth.PierConstraintDefinition exposing (..)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Location as L exposing (Location)
import Forth.Geometry.PierLocation exposing (PierLocation, PierMargin)
import Forth.Geometry.Rot45 as Rot45
import Forth.LocationDefinition as LD
import Forth.PierConstraint exposing (PierConstraint, flip)
import Types.Rail exposing (IsFlipped(..), Rail(..))


flat : Location -> PierLocation
flat loc =
    { location = loc
    , margin = flatRailMargin
    }


slopeCurve : Location -> PierLocation
slopeCurve loc =
    { location = loc
    , margin = slopeCurveMargin
    }


flatRailMargin : PierMargin
flatRailMargin =
    { top = 4
    , bottom = 0
    }


slopeCurveMargin : PierMargin
slopeCurveMargin =
    { top = 4
    , bottom = 1
    }



{-
   # 直線レールのようなもの: 直線部分にmayを設定する
   - 直線レールの類： mayに明示的に含める
   - Forward/Backward: 直線とおんなじ

   # 曲線レールなど、特に設定がない
   -    各種の曲線レール、複線曲線レール: may, mustNotには何も入らない。
   -    八の字: may, mustNotには何も入らない。
   -    シフト: なにもなし

   # 直線部分にmust notを入れる必要がある
      複線直線レール: mustNotが入る
      ターンアウト、単線複線、複線ワイド： 直線部分にmustNotが入る
      stop: 直線レールと異なり、mustNotに入る
      自動ターンアウト、自動ポイント、自動クロスレール: mustNotが入る
      oneway: ターンアウトと同じ
      ワイドクロス: mustNot

   # 橋脚の設定に工夫が必要
   - 2倍曲線レール: 途中に1つ余計に橋脚がmustで入る。
   - 坂曲線: may, mustNotは何もないが、PierPlacementを正しく作る必要がある。
   - 坂: mustNotにいい感じに入れるのだが、2倍直線レールの5倍、5 * 7 = 35個の点を持ってしまうぞ。上下だけの 2 * 7 でよければ
   - uturn: がんばる

-}


straightConstraint : Int -> PierConstraint
straightConstraint n =
    { must = [ LD.zero |> flat, LD.straight n |> flat ]
    , may = List.range 1 (n - 1) |> List.map LD.straight
    , mustNot = []
    }


{-| mayにもmustNotにも何も入らない制約
-}
plainConstraint : List Location -> PierConstraint
plainConstraint must =
    flatConstraint must []


{-| 坂曲線用の制約。引数の順番に注意
-}
slopeCurveConstraint : Location -> Location -> PierConstraint
slopeCurveConstraint origin up =
    { must = [ origin |> flat, up |> slopeCurve ]
    , may = []
    , mustNot = []
    }


flatConstraint : List Location -> List Location -> PierConstraint
flatConstraint must mustNot =
    { must = List.map flat must
    , may = []
    , mustNot = mustNot
    }


getPierConstraint : Rail inverted IsFlipped -> PierConstraint
getPierConstraint rail =
    case rail of
        Straight1 _ ->
            straightConstraint 1

        Straight2 _ ->
            straightConstraint 2

        Straight4 _ ->
            straightConstraint 4

        Straight8 _ ->
            straightConstraint 8

        DoubleStraight4 _ ->
            flatConstraint [ LD.zero, LD.zeroDoubleRight, LD.straightDoubleRight 4, LD.straight 4 ] <|
                List.map LD.straight (List.range 1 3)
                    ++ List.map LD.straightDoubleRight (List.range 1 3)

        Curve45 f _ ->
            flip f <| plainConstraint [ LD.zero, LD.left45 ]

        Curve90 f _ ->
            flip f <| plainConstraint [ LD.zero, LD.left45, LD.left90 ]

        OuterCurve45 f _ ->
            flip f <| plainConstraint [ LD.zero, LD.outerLeft45 ]

        DoubleCurve45 f _ ->
            flip f <|
                plainConstraint
                    [ LD.zero
                    , LD.zeroDoubleRight
                    , LD.doubleRightAndOuterLeft45
                    , LD.left45
                    ]

        Turnout f _ ->
            flip f <|
                flatConstraint [ LD.zero, LD.straight 4, LD.left45 ] <|
                    List.map LD.straight (List.range 1 3)

        SingleDouble f _ ->
            flip f <|
                flatConstraint [ LD.zero, LD.straight 4, LD.straightDoubleLeft 4 ] <|
                    List.map LD.straight (List.range 1 3)

        DoubleWide f _ ->
            flip f <|
                flatConstraint [ LD.zero, LD.straight 5, LD.straightWideLeft 5, LD.zeroDoubleLeft ] <|
                    List.map LD.straight (List.range 1 4)

        EightPoint f _ ->
            flip f <| plainConstraint [ LD.zero, LD.right45, LD.left45 ]

        JointChange _ ->
            straightConstraint 1

        Slope f _ ->
            flip f <|
                flatConstraint [ LD.zero, LD.straightAndUp 4 8 ] <|
                    List.map LD.straight (List.range 1 7)
                        ++ List.map (LD.straightAndUp 4) (List.range 1 7)

        Shift f _ ->
            flip f <| plainConstraint [ LD.zero, LD.straightDoubleLeft 4 ]

        SlopeCurveA ->
            slopeCurveConstraint LD.zero LD.right45AndUp

        SlopeCurveB ->
            slopeCurveConstraint LD.zero LD.left45AndUp

        Stop _ ->
            flatConstraint [ LD.zero, LD.straight 4 ] <| List.map LD.straight <| List.range 1 3

        AutoTurnout ->
            flatConstraint [ LD.zero, LD.straight 6, LD.straightAndLeft45 2 ] <|
                List.map LD.straight (List.range 1 5)

        AutoPoint ->
            flatConstraint [ LD.zero, LD.straightDoubleRight 6, LD.straight 6, LD.straightAndLeft45 2 ] <|
                List.map LD.straight (List.range 1 5)

        AutoCross ->
            flatConstraint [ LD.zero, LD.zeroDoubleRight, LD.straightDoubleRight 4, LD.straight 4 ] <|
                List.map LD.straight (List.range 1 3)
                    ++ List.map LD.straightDoubleRight (List.range 1 3)

        UTurn ->
            plainConstraint uturnLocations

        Oneway f ->
            flip f <|
                flatConstraint [ LD.zero, LD.straight 4, LD.left45 ] <|
                    List.map LD.straight (List.range 1 3)

        WideCross ->
            flatConstraint [ LD.zero, LD.zeroWideRight, LD.straightWideRight 4, LD.straight 4 ] <|
                List.map LD.straight (List.range 1 3)
                    ++ List.map LD.straightWideRight (List.range 1 3)

        Forward _ ->
            straightConstraint 2

        Backward _ ->
            straightConstraint 2


uturnLocations : List Location
uturnLocations =
    [ LD.zero
    , L.make (Rot45.make 10 -5 0 0) (Rot45.make 0 0 1 0) 0 Dir.se
    , L.make (Rot45.make 10 0 -5 0) (Rot45.make 0 0 1 0) 0 Dir.e
    , L.make (Rot45.make 10 0 0 -5) (Rot45.make 0 0 1 0) 0 Dir.ne
    , L.make (Rot45.make 15 0 0 0) (Rot45.make 0 0 1 0) 0 Dir.n
    , L.make (Rot45.make 10 5 0 0) (Rot45.make 0 0 1 0) 0 Dir.nw
    , L.make (Rot45.make 10 0 5 0) (Rot45.make 0 0 1 0) 0 Dir.w
    , L.make (Rot45.make 10 0 0 5) (Rot45.make 0 0 1 0) 0 Dir.sw
    , LD.zeroDoubleLeft
    ]
