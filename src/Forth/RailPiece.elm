module Forth.RailPiece exposing (getRailPiece, getRailTerminals, initialLocation, placeRail, rotateRailPiece)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint exposing (Joint)
import Forth.Geometry.Location as Location
import Forth.Geometry.PierLocation as PierLocation exposing (PierLocation)
import Forth.Geometry.RailLocation as RailLocation exposing (RailLocation)
import Forth.Geometry.Rot45 as Rot45
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Math.Vector3 exposing (Vec3)
import Types.Rail as Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import Types.RailRenderData exposing (RailRenderData)



-- 具体的なレールの配置についてのモジュール


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


doubleTrackLeftZeroMinus : RailLocation
doubleTrackLeftZeroMinus =
    RailLocation.make Rot45.zero (Rot45.make 0 0 2 0) 0 Dir.w Joint.Minus


doubleTrackRightZeroMinus : RailLocation
doubleTrackRightZeroMinus =
    RailLocation.make Rot45.zero (Rot45.make 0 0 -2 0) 0 Dir.w Joint.Minus


goStraightPlus : Int -> RailLocation
goStraightPlus x =
    RailLocation.make (Rot45.make x 0 0 0) Rot45.zero 0 Dir.e Joint.Plus


goStraightMinus : Int -> RailLocation
goStraightMinus x =
    RailLocation.make (Rot45.make x 0 0 0) Rot45.zero 0 Dir.e Joint.Minus


turnLeft45deg : RailLocation
turnLeft45deg =
    RailLocation.make (Rot45.make 0 0 8 -8) Rot45.zero 0 Dir.ne Joint.Plus


turnRight45degMinus : RailLocation
turnRight45degMinus =
    RailLocation.make (Rot45.make 0 8 -8 0) Rot45.zero 0 Dir.se Joint.Minus


turnLeftOuter45deg : RailLocation
turnLeftOuter45deg =
    RailLocation.make (Rot45.make 0 0 8 -8) (Rot45.make 0 0 2 -2) 0 Dir.ne Joint.Plus


turnLeft90deg : RailLocation
turnLeft90deg =
    RailLocation.mul turnLeft45deg.location turnLeft45deg


doubleTrackLeft : RailLocation
doubleTrackLeft =
    RailLocation.make (Rot45.make 8 0 0 0) (Rot45.make 0 0 2 0) 0 Dir.e Joint.Plus


doubleTrackRight : RailLocation
doubleTrackRight =
    RailLocation.make (Rot45.make 8 0 0 0) (Rot45.make 0 0 -2 0) 0 Dir.e Joint.Plus


doubleTrackWideLeft : RailLocation
doubleTrackWideLeft =
    RailLocation.make (Rot45.make 10 0 4 0) Rot45.zero 0 Dir.e Joint.Plus


slopeCurveA : RailLocation
slopeCurveA =
    RailLocation.make (Rot45.make 0 8 -8 0) Rot45.zero 1 Dir.se Joint.Minus


slopeCurveB : RailLocation
slopeCurveB =
    RailLocation.make (Rot45.make 0 0 8 -8) Rot45.zero 1 Dir.ne Joint.Plus


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
            twoEnds minusZero <| goStraightPlus 2

        Straight2 _ ->
            twoEnds minusZero <| goStraightPlus 4

        Straight4 _ ->
            twoEnds minusZero <| goStraightPlus 8

        Straight8 _ ->
            twoEnds minusZero <| goStraightPlus 16

        DoubleStraight4 _ ->
            fourEnds minusZero doubleTrackRightZeroMinus doubleTrackRight (goStraightPlus 8)

        Curve45 f _ ->
            flip f <| twoEnds minusZero turnLeft45deg

        Curve90 f _ ->
            flip f <|
                { railLocations = Nonempty minusZero [ turnLeft90deg ]
                , pierLocations = List.map (PierLocation.fromRailLocation PierLocation.flatRailMargin) [ minusZero, turnLeft45deg, turnLeft90deg ]
                , origin = RailLocation.zero
                }

        OuterCurve45 f _ ->
            flip f <| twoEnds minusZero turnLeftOuter45deg

        DoubleCurve45 f _ ->
            flip f <|
                fourEnds
                    minusZero
                    doubleTrackRightZeroMinus
                    (RailLocation.make (Rot45.make 0 0 8 -8) (Rot45.make 0 0 0 -2) 0 Dir.ne Joint.Plus)
                    turnLeft45deg

        Turnout f _ ->
            flip f <| threeEnds minusZero (goStraightPlus 8) turnLeft45deg

        SingleDouble f _ ->
            flip f <| threeEnds minusZero (goStraightPlus 8) doubleTrackLeft

        DoubleWide f _ ->
            flip f <| fourEnds minusZero (goStraightMinus 10) doubleTrackWideLeft doubleTrackLeftZeroMinus

        EightPoint f _ ->
            flip f <| threeEnds minusZero turnRight45degMinus turnLeft45deg

        JointChange _ ->
            twoEnds minusZero (goStraightMinus 2)

        Slope f _ ->
            flip f <| twoEnds minusZero (RailLocation.setHeight 4 (goStraightPlus 16))

        Shift f _ ->
            flip f <| twoEnds minusZero doubleTrackLeft

        SlopeCurveA ->
            { railLocations =
                Nonempty plusZero [ slopeCurveA ]
            , pierLocations =
                [ { location = plusZero.location, margin = PierLocation.flatRailMargin }
                , { location = slopeCurveA.location, margin = PierLocation.slopeCurveMargin }
                ]
            , origin = RailLocation.zero
            }

        SlopeCurveB ->
            { railLocations =
                Nonempty minusZero [ slopeCurveB ]
            , pierLocations =
                [ { location = plusZero.location, margin = PierLocation.flatRailMargin }
                , { location = slopeCurveB.location, margin = PierLocation.slopeCurveMargin }
                ]
            , origin = RailLocation.zero
            }

        Stop _ ->
            twoEnds minusZero (goStraightPlus 8)

        AutoTurnout ->
            threeEnds minusZero (goStraightPlus 12) (RailLocation.mul (goStraightPlus 4).location turnLeft45deg)

        AutoPoint ->
            fourEnds minusZero (RailLocation.mul (goStraightPlus 4).location doubleTrackRight) (goStraightPlus 12) (RailLocation.mul (goStraightPlus 4).location turnLeft45deg)

        AutoCross ->
            fourEnds minusZero doubleTrackRightZeroMinus doubleTrackRight (goStraightPlus 8)

        UTurn ->
            { railLocations =
                Nonempty minusZero [ doubleTrackLeftZeroMinus ]
            , pierLocations =
                List.map (\loc -> { location = loc, margin = PierLocation.flatRailMargin })
                    [ minusZero.location
                    , Location.make (Rot45.make 10 -5 0 0) (Rot45.make 0 0 1 0) 0 Dir.se
                    , Location.make (Rot45.make 10 0 -5 0) (Rot45.make 0 0 1 0) 0 Dir.e
                    , Location.make (Rot45.make 10 0 0 -5) (Rot45.make 0 0 1 0) 0 Dir.ne
                    , Location.make (Rot45.make 15 0 0 0) (Rot45.make 0 0 1 0) 0 Dir.n
                    , Location.make (Rot45.make 10 5 0 0) (Rot45.make 0 0 1 0) 0 Dir.nw
                    , Location.make (Rot45.make 10 0 5 0) (Rot45.make 0 0 1 0) 0 Dir.w
                    , Location.make (Rot45.make 10 0 0 5) (Rot45.make 0 0 1 0) 0 Dir.sw
                    , doubleTrackLeftZeroMinus.location
                    ]
            , origin = RailLocation.zero
            }

        Oneway f ->
            invert Inverted <| flip f <| threeEnds minusZero (goStraightPlus 8) turnLeft45deg

        WideCross ->
            fourEnds
                minusZero
                (RailLocation.make (Rot45.make 0 0 -4 0) Rot45.zero 0 Dir.w Joint.Plus)
                (RailLocation.make (Rot45.make 8 0 -4 0) Rot45.zero 0 Dir.e Joint.Minus)
                (goStraightPlus 8)

        Forward _ ->
            twoEnds minusZero (goStraightPlus 4)

        Backward _ ->
            twoEnds minusZero (goStraightPlus 4)


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


toRailRenderData : Rail IsInverted IsFlipped -> RailLocation -> RailRenderData
toRailRenderData rail location =
    Types.RailRenderData.make rail (RailLocation.toVec3 location) (Dir.toRadian location.location.dir)


type alias PlaceRailParams =
    { railType : Rail () IsFlipped
    , location : RailLocation
    , rotation : Int
    }


type alias PlaceRailResult =
    { rail : Rail IsInverted IsFlipped
    , nextLocations : List RailLocation
    , railRenderData : RailRenderData
    , pierLocations : List PierLocation
    }


placeRail : PlaceRailParams -> Maybe PlaceRailResult
placeRail params =
    getAppropriateRailAndPieceForJoint params.location.joint params.railType params.rotation
        |> Maybe.map
            (\( rail, railPiece ) ->
                { rail = rail
                , nextLocations =
                    List.map (RailLocation.mul params.location.location) <| Nonempty.tail railPiece.railLocations
                , railRenderData =
                    toRailRenderData rail (RailLocation.mul params.location.location railPiece.origin)
                , pierLocations =
                    List.map (PierLocation.mul params.location.location) <| railPiece.pierLocations
                }
            )


initialLocation : RailLocation
initialLocation =
    RailLocation.make Rot45.zero Rot45.zero 0 Dir.e Joint.Plus


getRailTerminals : Rail IsInverted IsFlipped -> { minus : List Vec3, plus : List Vec3 }
getRailTerminals rail =
    let
        railPiece =
            if Rail.isInverted rail then
                invert Rail.Inverted <| getRailPiece (Rail.map (always ()) rail)

            else
                getRailPiece (Rail.map (always ()) rail)
    in
    { minus =
        List.map RailLocation.toVec3 <| List.filter (\loc -> loc.joint == Joint.Minus) <| Nonempty.toList railPiece.railLocations
    , plus =
        List.map RailLocation.toVec3 <| List.filter (\loc -> loc.joint == Joint.Plus) <| Nonempty.toList railPiece.railLocations
    }
