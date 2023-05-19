module Forth.RailPieceTest exposing (..)

import Expect exposing (..)
import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint
import Forth.Geometry.PierLocation as PierLocation
import Forth.Geometry.RailLocation as RailLocation
import Forth.Geometry.Rot45 as Rot45
import Forth.RailPiece exposing (..)
import List.Nonempty exposing (Nonempty(..))
import Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import Test exposing (..)


suite : Test
suite =
    describe "RailPiece module"
        [ describe "rotateRailPiece" <|
            [ test "rotate Turnout once" <|
                \_ ->
                    Expect.equal
                        { locations =
                            Nonempty
                                (RailLocation.make (Rot45.make 0 0 0 0) Rot45.zero 0 Dir.w Joint.Plus)
                                [ RailLocation.make (Rot45.make 4 0 -4 4) Rot45.zero 0 Dir.sw Joint.Plus
                                , RailLocation.make (Rot45.make 4 0 0 0) Rot45.zero 0 Dir.e Joint.Minus
                                ]
                        , origin = RailLocation.make (Rot45.make 4 0 0 0) Rot45.zero 0 Dir.w Joint.Plus
                        , margins = Nonempty PierLocation.flatRailMargin [ PierLocation.flatRailMargin, PierLocation.flatRailMargin ]
                        }
                        (rotateRailPiece <| getRailPiece <| Turnout NotFlipped ())
            , test "rotate Turnout twice" <|
                \_ ->
                    Expect.equal
                        { locations =
                            Nonempty
                                (RailLocation.make (Rot45.make 0 0 0 0) Rot45.zero 0 Dir.w Joint.Plus)
                                [ RailLocation.make (Rot45.make 0 4 -4 0) Rot45.zero 0 Dir.se Joint.Minus
                                , RailLocation.make (Rot45.make 0 4 -4 4) Rot45.zero 0 Dir.nw Joint.Plus
                                ]
                        , origin = RailLocation.make (Rot45.make 0 4 -4 0) Rot45.zero 0 Dir.nw Joint.Plus
                        , margins = Nonempty PierLocation.flatRailMargin [ PierLocation.flatRailMargin, PierLocation.flatRailMargin ]
                        }
                        (rotateRailPiece <| rotateRailPiece <| getRailPiece <| Turnout NotFlipped ())
            , test "rotate Turnout three times" <|
                \_ ->
                    Expect.equal
                        (getRailPiece <| Turnout NotFlipped ())
                        (rotateRailPiece <| rotateRailPiece <| rotateRailPiece <| getRailPiece <| Turnout NotFlipped ())
            ]
        ]
