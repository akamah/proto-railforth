module Forth.PierConstruction exposing (construct)

import Forth.PierConstraction.Impl as Impl
import Forth.PierConstraint as PierConstraint
import Forth.PierPlacement as PierPlacement
import Forth.RailPieceLogic as RailPieceLogic
import Forth.RailPlacement exposing (RailPlacement)
import Types.PierRenderData exposing (PierRenderData)
import Types.Rail exposing (Rail(..))



{-
   このモジュールでは、線路の配置から橋脚の配置を求める。
   線路の配置（RailPlacement）は共通のデータ型という立ち位置であるため、
   それを入力として受け取り PierRenderDataを返却する。

   また、入力が不正であったり矛盾があったとしても結果を一応返す。
   理由はインタラクティブなソフトウェアであるため、ひとつ間違った線路を引いた時に橋脚が画面から消失するのは避けたいため。
-}


type alias PierConstructionResult =
    { pierRenderData : List PierRenderData
    , error : Maybe PierConstructionError
    }


type alias PierConstructionError =
    String


construct : List RailPlacement -> PierConstructionResult
construct list =
    let
        { pierPlacements, error } =
            Impl.construct <|
                PierConstraint.concat <|
                    List.map RailPieceLogic.getPierConstraintFromRailPlacement list
    in
    { pierRenderData = List.map PierPlacement.toPierRenderData pierPlacements
    , error = error
    }
