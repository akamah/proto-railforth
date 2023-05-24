module Forth.RailPiece exposing (getRailPiece, initialLocation, placeRail, rotateRailPiece)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint exposing (Joint)
import Forth.Geometry.PierLocation as PierLocation exposing (PierLocation)
import Forth.Geometry.RailLocation as RailLocation exposing (RailLocation)
import Forth.Geometry.Rot45 as Rot45
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import RailPlacement exposing (RailPlacement)



-- -- 具体的なレールの配置についてのモジュール


type alias RailPiece =
    { --| 反時計回りの地点の集まり。これの先頭とスタックトップをつなげるイメージ
      railLocations : Nonempty RailLocation

    --| 同じく反時計回りの橋脚の設置地点の集まり。2倍曲線レールの真ん中にも配置したいので、必ずしも railLocations とは対応しない
    --| また、必ずしもある必要はないはずなので通常のListで持つ
    --| 順序は関係ないが、Setを使うのも手間なので
    , pierLocations : List PierLocation

    --| 主に表示用として、レールの種類的にはどこに配置するべきか、の情報。回転を考慮すると、locationsの先頭のほかにこれを用意する他なかった
    --| 基本の形から回転していない場合は、locationsの先頭とちょうど逆になる。表示用なので凹凸は考慮しない
    --| TODO: 凹凸の情報を抜いた Location 型がほしい
    , origin : RailLocation
    }


{-| レールを構成する。以下の２つの条件がある。

1.  レールの端点にのみ橋脚を設置する前提
2.  その端点も、坂曲線レールのように厚みを持たない。

-}
makeFlatRailPiece : Nonempty RailLocation -> RailPiece
makeFlatRailPiece list =
    { railLocations = list
    , pierLocations = List.map (PierLocation.fromRailLocation PierLocation.flatRailMargin) <| Nonempty.toList list
    , origin = RailLocation.zero
    }


twoEnds : RailLocation -> RailLocation -> RailPiece
twoEnds a b =
    makeFlatRailPiece <| Nonempty a [ b ]


threeEnds : RailLocation -> RailLocation -> RailLocation -> RailPiece
threeEnds a b c =
    makeFlatRailPiece <| Nonempty a [ b, c ]


fourEnds : RailLocation -> RailLocation -> RailLocation -> RailLocation -> RailPiece
fourEnds a b c d =
    makeFlatRailPiece <| Nonempty a [ b, c, d ]


minusZero : RailLocation
minusZero =
    RailLocation.make Rot45.zero Rot45.zero 0 Dir.w Joint.Minus


plusZero : RailLocation
plusZero =
    RailLocation.make Rot45.zero Rot45.zero 0 Dir.w Joint.Plus


goStraight1 : RailLocation
goStraight1 =
    RailLocation.make (Rot45.make 1 0 0 0) Rot45.zero 0 Dir.e Joint.Plus


goStraight1Minus : RailLocation
goStraight1Minus =
    RailLocation.make (Rot45.make 1 0 0 0) Rot45.zero 0 Dir.e Joint.Minus


goStraight2 : RailLocation
goStraight2 =
    RailLocation.mul goStraight1.location goStraight1


goStraight4 : RailLocation
goStraight4 =
    RailLocation.mul goStraight2.location goStraight2


goStraight6 : RailLocation
goStraight6 =
    RailLocation.mul goStraight2.location goStraight4


goStraight8 : RailLocation
goStraight8 =
    RailLocation.mul goStraight4.location goStraight4


turnLeft45deg : RailLocation
turnLeft45deg =
    RailLocation.make (Rot45.make 0 0 4 -4) Rot45.zero 0 Dir.ne Joint.Plus


turnRight45deg : RailLocation
turnRight45deg =
    RailLocation.flip turnLeft45deg


turnLeftOuter45deg : RailLocation
turnLeftOuter45deg =
    RailLocation.make (Rot45.make 0 0 4 -4) (Rot45.make 0 0 1 -1) 0 Dir.ne Joint.Plus


turnLeft90deg : RailLocation
turnLeft90deg =
    RailLocation.mul turnLeft45deg.location turnLeft45deg


doubleTrackLeft : RailLocation
doubleTrackLeft =
    RailLocation.make (Rot45.make 4 0 0 0) (Rot45.make 0 0 1 0) 0 Dir.e Joint.Plus


doubleTrackRight : RailLocation
doubleTrackRight =
    RailLocation.make (Rot45.make 4 0 0 0) (Rot45.make 0 0 -1 0) 0 Dir.e Joint.Plus


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


reverseTail : Nonempty a -> Nonempty a
reverseTail (Nonempty x xs) =
    Nonempty x (List.reverse xs)


{-| レールピースをひっくり返す。途中にList.reverseが入るのはひっくり返すと時計回りになるのを反時計回りに戻すため。
-}
flip : IsFlipped -> RailPiece -> RailPiece
flip flipped piece =
    case flipped of
        NotFlipped ->
            piece

        Flipped ->
            { railLocations = Nonempty.map RailLocation.flip <| reverseTail piece.railLocations
            , pierLocations = List.map PierLocation.flip piece.pierLocations
            , origin = RailLocation.flip piece.origin
            }


getRailPiece : Rail () IsFlipped -> RailPiece
getRailPiece rail =
    case rail of
        Straight1 _ ->
            twoEnds minusZero goStraight1

        Straight2 _ ->
            twoEnds minusZero goStraight2

        Straight4 _ ->
            twoEnds minusZero goStraight4

        Straight8 _ ->
            twoEnds minusZero goStraight8

        Curve45 f _ ->
            flip f <| twoEnds minusZero turnLeft45deg

        Curve90 f _ ->
            flip f <| twoEnds minusZero turnLeft90deg

        OuterCurve45 f _ ->
            flip f <| twoEnds minusZero turnLeftOuter45deg

        Turnout f _ ->
            flip f <| threeEnds minusZero goStraight4 turnLeft45deg

        SingleDouble f _ ->
            flip f <| threeEnds minusZero goStraight4 doubleTrackLeft

        EightPoint f _ ->
            flip f <| threeEnds minusZero turnRight45deg turnLeft45deg

        JointChange _ ->
            twoEnds minusZero goStraight1Minus

        Slope f _ ->
            flip f <| twoEnds minusZero (RailLocation.setHeight 4 goStraight8)

        SlopeCurveA ->
            { railLocations =
                Nonempty plusZero
                    [ turnRight45deg
                        |> RailLocation.setHeight 1
                        |> RailLocation.setJoint Joint.Minus
                    ]
            , pierLocations =
                []
            , origin = RailLocation.zero
            }

        SlopeCurveB ->
            { railLocations =
                Nonempty minusZero [ RailLocation.setHeight 1 turnLeft45deg ]
            , pierLocations = []
            , origin = RailLocation.zero
            }

        Stop _ ->
            twoEnds minusZero goStraight4

        AutoTurnout ->
            threeEnds minusZero goStraight6 (RailLocation.mul goStraight2.location turnLeft45deg)

        AutoPoint ->
            fourEnds minusZero (RailLocation.mul goStraight2.location doubleTrackRight) goStraight6 (RailLocation.mul goStraight2.location turnLeft45deg)


{-| remove the first element from the list and append it to the end
-}
rotate : Nonempty a -> Nonempty a
rotate (Nonempty x xs) =
    case xs of
        [] ->
            Nonempty x xs

        y :: ys ->
            Nonempty y (ys ++ [ x ])


loop : Int -> (a -> a) -> a -> a
loop n f a =
    if n <= 0 then
        a

    else
        loop (n - 1) f (f a)


rotateRailPiece : RailPiece -> RailPiece
rotateRailPiece piece =
    case piece.railLocations of
        Nonempty _ [] ->
            piece

        Nonempty current (next :: _) ->
            let
                rot =
                    RailLocation.mul current.location (RailLocation.inv next)
            in
            { origin = RailLocation.mul rot.location piece.origin
            , railLocations = rotate <| Nonempty.map (RailLocation.mul rot.location) piece.railLocations

            --            , margins = piece.margins
            , pierLocations = List.map (PierLocation.mul rot.location) piece.pierLocations
            }


getAppropriateRailAndPieceForJoint : Joint -> Rail () IsFlipped -> Int -> Maybe ( Rail IsInverted IsFlipped, RailPiece )
getAppropriateRailAndPieceForJoint joint railType rotation =
    let
        railPiece =
            loop rotation rotateRailPiece <| getRailPiece railType
    in
    if Joint.match joint (Nonempty.head railPiece.railLocations).joint then
        -- これから置く予定のレールと、スタックトップの方向がマッチしたのでそのまま配置する
        Just ( Rail.map (always Rail.NotInverted) railType, railPiece )

    else if Rail.canInvert railType then
        -- これから置くレールの凹凸を反転させることで配置することが可能である。
        Just ( Rail.map (always Rail.Inverted) railType, invert Rail.Inverted railPiece )

    else
        -- 凹凸がマッチしないため、配置することができない
        Nothing


placeRailPieceAtLocation : RailLocation -> RailPiece -> List RailLocation
placeRailPieceAtLocation base railPiece =
    List.map (RailLocation.mul base.location) <| Nonempty.tail railPiece.railLocations


toRailPlacement : Rail IsInverted IsFlipped -> RailLocation -> RailPlacement
toRailPlacement rail location =
    RailPlacement.make rail (RailLocation.toVec3 location) (Dir.toRadian location.location.dir)


type alias PlaceRailParams =
    { railType : Rail () IsFlipped
    , location : RailLocation
    , rotation : Int
    }


type alias PlaceRailResult =
    { rail : Rail IsInverted IsFlipped
    , nextLocations : List RailLocation
    , railPlacement : RailPlacement
    , pierLocations : List PierLocation
    }


placeRail : PlaceRailParams -> Maybe PlaceRailResult
placeRail params =
    getAppropriateRailAndPieceForJoint params.location.joint params.railType params.rotation
        |> Maybe.map
            (\( rail, railPiece ) ->
                let
                    nextLocations =
                        List.map (RailLocation.mul params.location.location) <| Nonempty.tail railPiece.railLocations

                    pierLocations =
                        List.map (PierLocation.mul params.location.location) <| railPiece.pierLocations
                in
                { rail = rail
                , nextLocations = nextLocations
                , railPlacement = toRailPlacement rail (RailLocation.mul params.location.location railPiece.origin)
                , pierLocations = pierLocations
                }
            )


initialLocation : RailLocation
initialLocation =
    RailLocation.make Rot45.zero Rot45.zero 0 Dir.e Joint.Plus
