module Forth.RailPieceTest exposing (..)

import Expect exposing (..)
import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint
import Forth.Geometry.RailLocation as RailLocation
import Forth.Geometry.Rot45 as Rot45
import Forth.RailPiece exposing (..)
import Forth.RailPieceDefinition exposing (getRailPiece)
import List.Nonempty exposing (Nonempty(..))
import Test exposing (..)
import Types.Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))


suite : Test
suite =
    describe "RailPiece module"
        [ describe "rotateRailPiece" <|
            [ test "rotate Turnout once" <|
                \_ ->
                    Expect.equal
                        { railLocations =
                            Nonempty
                                (RailLocation.make (Rot45.make 0 0 0 0) Rot45.zero 0 Dir.w Joint.Plus)
                                [ RailLocation.make (Rot45.make 8 0 -8 8) Rot45.zero 0 Dir.sw Joint.Plus
                                , RailLocation.make (Rot45.make 8 0 0 0) Rot45.zero 0 Dir.e Joint.Minus
                                ]
                        , origin = RailLocation.make (Rot45.make 8 0 0 0) Rot45.zero 0 Dir.w Joint.Minus
                        }
                        (rotate <| getRailPiece <| Turnout NotFlipped NotInverted)
            , test "rotate Turnout twice" <|
                \_ ->
                    Expect.equal
                        { railLocations =
                            Nonempty
                                (RailLocation.make (Rot45.make 0 0 0 0) Rot45.zero 0 Dir.w Joint.Plus)
                                [ RailLocation.make (Rot45.make 0 8 -8 0) Rot45.zero 0 Dir.se Joint.Minus
                                , RailLocation.make (Rot45.make 0 8 -8 8) Rot45.zero 0 Dir.nw Joint.Plus
                                ]
                        , origin = RailLocation.make (Rot45.make 0 8 -8 0) Rot45.zero 0 Dir.nw Joint.Minus
                        }
                        (rotate <| rotate <| getRailPiece <| Turnout NotFlipped NotInverted)
            , test "rotate Turnout three times" <|
                \_ ->
                    Expect.equal
                        (getRailPiece <| Turnout NotFlipped NotInverted)
                        (rotate <| rotate <| rotate <| getRailPiece <| Turnout NotFlipped NotInverted)
            ]
        ]
