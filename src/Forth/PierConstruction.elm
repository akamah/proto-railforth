module Forth.PierConstruction exposing (toPierRenderData)

import Forth.Geometry.PierLocation as PierLocation exposing (PierLocation)
import Forth.PierConstraction.Impl exposing (PierPlacement(..), construct)
import Forth.RailPiece as RailPiece
import Forth.RailPlacement exposing (RailPlacement)
import Types.PierRenderData exposing (PierRenderData)
import Types.Rail exposing (Rail(..))


{-| レールを引くことに関してと、橋脚をどう設置するかについては別問題に思えたので、
レールの端点の定義から橋脚の配置についての定義を分離する。
-}
getPierLocations : Rail invert flip -> List PierPlacement
getPierLocations rail =
    case rail of
        Straight1 _ ->
            [ Must <| PierLocation.make Rot45.zer
            ]

        Straight2 i ->
            invert i <| twoEnds minusZero <| goStraightPlus 4

        Straight4 i ->
            invert i <| twoEnds minusZero <| goStraightPlus 8

        Straight8 i ->
            invert i <| twoEnds minusZero <| goStraightPlus 16

        DoubleStraight4 i ->
            invert i <| fourEnds minusZero doubleTrackRightZeroMinus doubleTrackRight (goStraightPlus 8)

        Curve45 f i ->
            invert i <| flip f <| twoEnds minusZero turnLeft45deg

        Curve90 f i ->
            invert i <|
                flip f <|
                    { railLocations = Nonempty minusZero [ turnLeft90deg ]
                    , pierLocations = List.map (PierLocation.fromRailLocation PierLocation.flatRailMargin) [ minusZero, turnLeft45deg, turnLeft90deg ]
                    , origin = RailLocation.zero
                    }

        OuterCurve45 f i ->
            invert i <| flip f <| twoEnds minusZero turnLeftOuter45deg

        DoubleCurve45 f i ->
            invert i <|
                flip f <|
                    fourEnds
                        minusZero
                        doubleTrackRightZeroMinus
                        (RailLocation.make (Rot45.make 0 0 8 -8) (Rot45.make 0 0 0 -2) 0 Dir.ne Joint.Plus)
                        turnLeft45deg

        Turnout f i ->
            invert i <| flip f <| threeEnds minusZero (goStraightPlus 8) turnLeft45deg

        SingleDouble f i ->
            invert i <| flip f <| threeEnds minusZero (goStraightPlus 8) doubleTrackLeft

        DoubleWide f i ->
            invert i <| flip f <| fourEnds minusZero (goStraightMinus 10) doubleTrackWideLeft doubleTrackLeftZeroMinus

        EightPoint f i ->
            invert i <| flip f <| threeEnds minusZero turnRight45degMinus turnLeft45deg

        JointChange i ->
            invert i <| twoEnds minusZero (goStraightMinus 2)

        Slope f i ->
            invert i <| flip f <| twoEnds minusZero (RailLocation.setHeight 4 (goStraightPlus 16))

        Shift f i ->
            invert i <| flip f <| twoEnds minusZero doubleTrackLeft

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

        Stop i ->
            invert i <| twoEnds minusZero (goStraightPlus 8)

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

        Forward i ->
            invert i <| twoEnds minusZero (goStraightPlus 4)

        Backward i ->
            invert i <| twoEnds minusZero (goStraightPlus 4)


toPierRenderData : List RailPlacement -> Result String (List PierRenderData)
toPierRenderData list =
    construct <| List.concatMap RailPiece.getPierLocations list
