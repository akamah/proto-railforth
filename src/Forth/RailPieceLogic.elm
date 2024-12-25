module Forth.RailPieceLogic exposing (..)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint exposing (Joint)
import Forth.Geometry.PierLocation as PierLocation exposing (PierLocation)
import Forth.Geometry.RailLocation as RailLocation exposing (RailLocation)
import Forth.Geometry.Rot45 as Rot45
import Forth.RailPiece exposing (RailPiece, rotateRailPiece)
import Forth.RailPieceDefinition exposing (getRailPiece)
import Forth.RailPlacement as RailPlacement exposing (RailPlacement)
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Math.Vector3 exposing (Vec3)
import Types.Rail as Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import Util exposing (loop)


getAppropriateRailAndPieceForJoint : Joint -> Rail () IsFlipped -> Int -> Maybe ( Rail IsInverted IsFlipped, RailPiece )
getAppropriateRailAndPieceForJoint joint railType rotation =
    let
        railNotInverted =
            Rail.map (always NotInverted) railType

        railInverted =
            Rail.map (always Inverted) railType

        railPieceMinus =
            loop rotation rotateRailPiece <| getRailPiece railNotInverted

        railPiecePlus =
            loop rotation rotateRailPiece <| getRailPiece railInverted
    in
    if Joint.match joint (Nonempty.head railPieceMinus.railLocations).joint then
        -- これから置く予定のレールと、スタックトップの方向がマッチしたのでそのまま配置する
        Just ( railNotInverted, railPieceMinus )

    else if Joint.match joint (Nonempty.head railPiecePlus.railLocations).joint then
        -- これから置くレールの凹凸を反転させることで配置することが可能である。
        Just ( railInverted, railPiecePlus )

    else
        -- 凹凸がマッチしないため、配置することができない
        Nothing


type alias PlaceRailResult =
    { railPlacement : RailPlacement
    , nextLocations : List RailLocation
    }


placeRail : Rail () IsFlipped -> Int -> RailLocation -> Maybe PlaceRailResult
placeRail railType rotation =
    let
        plusCase =
            getAppropriateRailAndPieceForJoint Joint.Plus railType rotation

        minusCase =
            getAppropriateRailAndPieceForJoint Joint.Minus railType rotation
    in
    \railLocation ->
        (if railLocation.joint == Joint.Plus then
            plusCase

         else
            minusCase
        )
            |> Maybe.map
                (\( rail, railPiece ) ->
                    { railPlacement =
                        RailPlacement.make rail <|
                            (RailLocation.mul railLocation.location railPiece.origin).location
                    , nextLocations =
                        List.map (RailLocation.mul railLocation.location) <| Nonempty.tail railPiece.railLocations
                    }
                )


getRailTerminals : Rail IsInverted IsFlipped -> { minus : List Vec3, plus : List Vec3 }
getRailTerminals rail =
    let
        railPiece =
            getRailPiece rail
    in
    { minus =
        List.map RailLocation.toVec3 <| List.filter (\loc -> loc.joint == Joint.Minus) <| Nonempty.toList railPiece.railLocations
    , plus =
        List.map RailLocation.toVec3 <| List.filter (\loc -> loc.joint == Joint.Plus) <| Nonempty.toList railPiece.railLocations
    }


getRailLocations : RailPlacement -> List RailLocation
getRailLocations railPlacement =
    List.map (RailLocation.mul railPlacement.location) <| Nonempty.toList (getRailPiece railPlacement.rail).railLocations


getPierLocations : RailPlacement -> List PierLocation
getPierLocations railPlacement =
    List.map (PierLocation.mul railPlacement.location) (getRailPiece railPlacement.rail).pierLocations
