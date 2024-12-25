module Forth.RailPiece exposing (RailPiece, flip, invert, rotate)

import Forth.Geometry.PierLocation as PierLocation exposing (PierLocation)
import Forth.Geometry.RailLocation as RailLocation exposing (RailLocation)
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Types.Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import Util



-- 具体的なレールの配置についてのモジュール


type alias RailPiece =
    { --| 反時計回りの地点の集まり。これの先頭とスタックトップをつなげるイメージ
      railLocations : Nonempty RailLocation

    --| 同じく反時計回りの橋脚の設置地点の集まり。2倍曲線レールの真ん中にも配置したいので、必ずしも railLocations とは対応しない
    --| また、必ずしもある必要はないはずなので通常のListで持つ
    --| 順序は関係ないが、Setを使うのも手間なので
    -- TODO: いずれこれは分離する予定だが、テストを通すためにしばらくはこのままで。
    , pierLocations : List PierLocation

    --| 主に表示用として、レールの種類的にはどこに配置するべきか、の情報。回転を考慮すると、locationsの先頭のほかにこれを用意する他なかった
    --| 基本の形から回転していない場合は、locationsの先頭とちょうど逆になる。表示用なので凹凸は考慮しない
    , origin : RailLocation
    }


invert : IsInverted -> RailPiece -> RailPiece
invert inverted piece =
    case inverted of
        NotInverted ->
            piece

        Inverted ->
            { railLocations = Nonempty.map RailLocation.invertJoint piece.railLocations
            , origin = RailLocation.invertJoint piece.origin
            , pierLocations = piece.pierLocations
            }


{-| レールピースをひっくり返す。途中にList.reverseが入るのはひっくり返すと時計回りになるのを反時計回りに戻すため。
-}
flip : IsFlipped -> RailPiece -> RailPiece
flip flipped piece =
    case flipped of
        NotFlipped ->
            piece

        Flipped ->
            { railLocations = Nonempty.map RailLocation.flip <| Util.reverseTail piece.railLocations
            , pierLocations = List.map PierLocation.flip piece.pierLocations
            , origin = RailLocation.flip piece.origin
            }


rotate : RailPiece -> RailPiece
rotate piece =
    case piece.railLocations of
        Nonempty _ [] ->
            piece

        Nonempty current (next :: _) ->
            let
                rot =
                    RailLocation.mul current.location (RailLocation.inv next)
            in
            { origin = RailLocation.mul rot.location piece.origin
            , railLocations = Util.rotate <| Nonempty.map (RailLocation.mul rot.location) piece.railLocations
            , pierLocations = List.map (PierLocation.mul rot.location) piece.pierLocations
            }
