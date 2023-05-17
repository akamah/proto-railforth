module Forth.RailPiece exposing (getRailPiece, initialLocation, placeRail, rotateRailPiece)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint exposing (Joint)
import Forth.Geometry.RailLocation as RailLocation exposing (RailLocation)
import Forth.Geometry.Rot45 as Rot45
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import RailPlacement exposing (RailPlacement)



-- -- 具体的なレールの配置についてのモジュール


type alias RailPiece =
    { --| 反時計回りの地点の集まり。これの先頭とスタックトップをつなげるイメージ
      locations : Nonempty RailLocation

    --| 主に表示用として、レールの種類的にはどこに配置するべきか、の情報。回転を考慮すると、locationsの先頭のほかにこれを用意する他なかった
    --| 基本の形から回転していない場合は、locationsの先頭とちょうど逆になる。表示用なので凹凸は考慮しない
    --| TODO: 凹凸の情報を抜いた Location 型がほしい
    , origin : RailLocation
    }


twoEnds : RailLocation -> RailLocation -> RailPiece
twoEnds a b =
    { locations = Nonempty a [ b ]
    , origin = originEast
    }


threeEnds : RailLocation -> RailLocation -> RailLocation -> RailPiece
threeEnds a b c =
    { locations = Nonempty a [ b, c ]
    , origin = originEast
    }


fourEnds : RailLocation -> RailLocation -> RailLocation -> RailLocation -> RailPiece
fourEnds a b c d =
    { locations = Nonempty a [ b, c, d ]
    , origin = originEast
    }


originEast : RailLocation
originEast =
    -- Joint is dummy
    RailLocation.make Rot45.zero Rot45.zero 0 Dir.e Joint.Plus


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
    RailLocation.mul goStraight1 goStraight1


goStraight4 : RailLocation
goStraight4 =
    RailLocation.mul goStraight2 goStraight2


goStraight6 : RailLocation
goStraight6 =
    RailLocation.mul goStraight2 goStraight4


goStraight8 : RailLocation
goStraight8 =
    RailLocation.mul goStraight4 goStraight4


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
    RailLocation.mul turnLeft45deg turnLeft45deg


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
            { locations = Nonempty.map RailLocation.invert piece.locations
            , origin = RailLocation.invert piece.origin
            }


{-| レールピースをひっくり返す。途中にList.reverseが入るのはひっくり返すと時計回りになるのを反時計回りに戻すため。
-}
flip : IsFlipped -> RailPiece -> RailPiece
flip flipped piece =
    case flipped of
        NotFlipped ->
            piece

        Flipped ->
            { locations =
                Nonempty (RailLocation.flip <| Nonempty.head piece.locations) <|
                    List.map RailLocation.flip <|
                        List.reverse <|
                            Nonempty.tail piece.locations
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
            twoEnds plusZero
                (turnRight45deg
                    |> RailLocation.setHeight 1
                    |> RailLocation.setJoint Joint.Minus
                )

        SlopeCurveB ->
            twoEnds minusZero (RailLocation.setHeight 1 turnLeft45deg)

        Stop _ ->
            twoEnds minusZero goStraight4

        AutoTurnout ->
            threeEnds minusZero goStraight6 (RailLocation.mul goStraight2 turnLeft45deg)

        AutoPoint ->
            fourEnds minusZero (RailLocation.mul goStraight2 doubleTrackRight) goStraight6 (RailLocation.mul goStraight2 turnLeft45deg)


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
    case piece.locations of
        Nonempty _ [] ->
            piece

        Nonempty current (next :: _) ->
            let
                rot =
                    RailLocation.mul current (RailLocation.negate next)
            in
            { origin = RailLocation.mul rot piece.origin
            , locations = rotate <| Nonempty.map (RailLocation.mul rot) piece.locations
            }


getAppropriateRailAndPieceForJoint : Joint -> Rail () IsFlipped -> Int -> Maybe ( Rail IsInverted IsFlipped, RailPiece )
getAppropriateRailAndPieceForJoint joint railType rotation =
    let
        railPiece =
            loop rotation rotateRailPiece <| getRailPiece railType
    in
    if Joint.match joint (Nonempty.head railPiece.locations).joint then
        -- これから置く予定のレールと、スタックトップの方向がマッチしたのでそのまま配置する
        Just ( Rail.map (\_ -> Rail.NotInverted) railType, railPiece )

    else if Rail.canInvert railType then
        -- これから置くレールの凹凸を反転させることで配置することが可能である。
        Just ( Rail.map (\_ -> Rail.Inverted) railType, invert Rail.Inverted railPiece )

    else
        -- 凹凸がマッチしないため、配置することができない
        Nothing


placeRailPieceAtLocation : RailLocation -> RailPiece -> List RailLocation
placeRailPieceAtLocation base railPiece =
    List.map (RailLocation.mul base) <| Nonempty.tail railPiece.locations


toRailPlacement : Rail IsInverted IsFlipped -> RailLocation -> RailPlacement
toRailPlacement rail location =
    RailPlacement.make rail (RailLocation.toVec3 location) (Dir.toRadian location.dir)


type alias PlaceRailParams =
    { railType : Rail () IsFlipped
    , location : RailLocation
    , rotation : Int
    }


type alias PlaceRailResult =
    { rail : Rail IsInverted IsFlipped
    , nextLocations : List RailLocation
    , railPlacement : RailPlacement
    }


placeRail : PlaceRailParams -> Maybe PlaceRailResult
placeRail params =
    getAppropriateRailAndPieceForJoint params.location.joint params.railType params.rotation
        |> Maybe.map
            (\( rail, railPiece ) ->
                { rail = rail
                , nextLocations = placeRailPieceAtLocation params.location railPiece
                , railPlacement = toRailPlacement rail (RailLocation.mul params.location railPiece.origin)
                }
            )


initialLocation : RailLocation
initialLocation =
    RailLocation.make Rot45.zero Rot45.zero 0 Dir.e Joint.Plus
