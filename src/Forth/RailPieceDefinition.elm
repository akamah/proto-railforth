module Forth.RailPieceDefinition exposing (getRailPiece)

import Forth.Geometry.RailLocation exposing (minus, plus)
import Forth.LocationDefinition as LD
import Forth.RailPiece exposing (RailPiece, flip, fourEnds, invert, threeEnds, twoEnds)
import Types.Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))


getRailPiece : Rail IsInverted IsFlipped -> RailPiece
getRailPiece rail =
    case rail of
        Straight1 i ->
            invert i <| twoEnds (LD.zero |> minus) (LD.straight 1 |> plus)

        Straight2 i ->
            invert i <| twoEnds (LD.zero |> minus) (LD.straight 2 |> plus)

        Straight4 i ->
            invert i <| twoEnds (LD.zero |> minus) (LD.straight 4 |> plus)

        Straight8 i ->
            invert i <| twoEnds (LD.zero |> minus) (LD.straight 8 |> plus)

        DoubleStraight4 i ->
            invert i <|
                fourEnds
                    (LD.zero |> minus)
                    (LD.zeroDoubleRight |> minus)
                    (LD.straightDoubleRight 4 |> plus)
                    (LD.straight 4 |> plus)

        Curve45 f i ->
            invert i <| flip f <| twoEnds (LD.zero |> minus) (LD.left45 |> plus)

        Curve90 f i ->
            invert i <| flip f <| twoEnds (LD.zero |> minus) (LD.left90 |> plus)

        OuterCurve45 f i ->
            invert i <| flip f <| twoEnds (LD.zero |> minus) (LD.outerLeft45 |> plus)

        DoubleCurve45 f i ->
            invert i <|
                flip f <|
                    fourEnds
                        (LD.zero |> minus)
                        (LD.zeroDoubleRight |> minus)
                        (LD.doubleRightAndOuterLeft45 |> plus)
                        (LD.left45 |> plus)

        Turnout f i ->
            invert i <| flip f <| threeEnds (LD.zero |> minus) (LD.straight 4 |> plus) (LD.left45 |> plus)

        SingleDouble f i ->
            invert i <| flip f <| threeEnds (LD.zero |> minus) (LD.straight 4 |> plus) (LD.straightDoubleLeft 4 |> plus)

        DoubleWide f i ->
            invert i <| flip f <| fourEnds (LD.zero |> minus) (LD.straight 5 |> minus) (LD.straightWideLeft 5 |> plus) (LD.zeroDoubleLeft |> minus)

        EightPoint f i ->
            invert i <| flip f <| threeEnds (LD.zero |> minus) (LD.right45 |> minus) (LD.left45 |> plus)

        JointChange i ->
            invert i <| twoEnds (LD.zero |> minus) (LD.straight 1 |> minus)

        Slope f i ->
            invert i <| flip f <| twoEnds (LD.zero |> minus) (LD.straightAndUp 8 4 |> plus)

        Shift f i ->
            invert i <| flip f <| twoEnds (LD.zero |> minus) (LD.straightDoubleLeft 4 |> plus)

        SlopeCurveA ->
            twoEnds (LD.zero |> plus) (LD.right45AndUp |> minus)

        SlopeCurveB ->
            twoEnds (LD.zero |> minus) (LD.left45AndUp |> plus)

        Stop i ->
            invert i <| twoEnds (LD.zero |> minus) (LD.straight 4 |> plus)

        AutoTurnout ->
            threeEnds
                (LD.zero |> minus)
                (LD.straight 6 |> plus)
                (LD.straightAndLeft45 2 |> plus)

        AutoPoint ->
            fourEnds
                (LD.zero |> minus)
                (LD.straightDoubleRight 6 |> plus)
                (LD.straight 6 |> plus)
                (LD.straightAndLeft45 2 |> plus)

        AutoCross ->
            fourEnds
                (LD.zero |> minus)
                (LD.zeroDoubleRight |> minus)
                (LD.straightDoubleRight 4 |> plus)
                (LD.straight 4 |> plus)

        UTurn ->
            twoEnds (LD.zero |> minus) (LD.zeroDoubleLeft |> minus)

        Oneway f ->
            invert Inverted <| flip f <| threeEnds (LD.zero |> minus) (LD.straight 4 |> plus) (LD.left45 |> plus)

        WideCross ->
            fourEnds
                (LD.zero |> minus)
                (LD.zeroWideRight |> plus)
                (LD.straightWideRight 4 |> minus)
                (LD.straight 4 |> plus)

        Forward i ->
            invert i <| twoEnds (LD.zero |> minus) (LD.straight 2 |> plus)

        Backward i ->
            invert i <| twoEnds (LD.zero |> minus) (LD.straight 2 |> plus)
