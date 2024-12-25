module Forth.RailPieceDefinition exposing (..)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint
import Forth.Geometry.Location as Location
import Forth.Geometry.PierLocation as PierLocation
import Forth.Geometry.RailLocation as RailLocation exposing (RailLocation)
import Forth.Geometry.Rot45 as Rot45
import Forth.RailPiece exposing (RailPiece, flip, invert)
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Types.Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))



{- Railに対応する RailPieceを定義する -}
{- リファクタリングの途中なので、pierLocationsも同時に返すようになってしまっている。 -}


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


getRailPiece : Rail IsInverted IsFlipped -> RailPiece
getRailPiece rail =
    case rail of
        Straight1 i ->
            invert i <| twoEnds minusZero <| goStraightPlus 2

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
