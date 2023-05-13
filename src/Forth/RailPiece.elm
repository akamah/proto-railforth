module Forth.RailPiece exposing (initialLocation, placeRail)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint exposing (Joint)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.Rot45 as Rot45
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import RailPlacement exposing (RailPlacement)



-- -- 具体的なレールの配置についてのモジュール


initialLocation : Location
initialLocation =
    Location.make Rot45.zero Rot45.zero 0 Dir.e Joint.Plus


toRailPlacement : Rail IsInverted IsFlipped -> Location -> RailPlacement
toRailPlacement rail location =
    RailPlacement.make rail (Location.originToVec3 location) (Dir.toRadian location.dir)


pair : a -> a -> Nonempty a
pair a b =
    Nonempty a [ b ]


triple : a -> a -> a -> Nonempty a
triple a b c =
    Nonempty a [ b, c ]



-- quadruple : a -> a -> a -> a -> Nonempty a
-- quadruple a b c d =
--     Nonempty a [ b, c, d ]


type alias RailPiece =
    Nonempty Location


minusZero : Location
minusZero =
    Location.make Rot45.zero Rot45.zero 0 Dir.w Joint.Minus



-- plusZero : Location
-- plusZero =
--     Location.make Rot45.zero Rot45.zero 0 Dir.w Joint.Plus


goStraight : Location
goStraight =
    Location.make (Rot45.make 4 0 0 0) Rot45.zero 0 Dir.e Joint.Plus


goStraightOneHalf : Location
goStraightOneHalf =
    Location.make (Rot45.make 6 0 0 0) Rot45.zero 0 Dir.e Joint.Plus


turnLeft : Location
turnLeft =
    Location.make (Rot45.make 0 0 4 -4) Rot45.zero 0 Dir.ne Joint.Plus


goStraightHalfThenTurnLeft : Location
goStraightHalfThenTurnLeft =
    Location.make (Rot45.make 2 0 4 -4) Rot45.zero 0 Dir.ne Joint.Plus


straight : Nonempty Location
straight =
    pair minusZero goStraight


curve : Nonempty Location
curve =
    pair minusZero turnLeft


turnOut : Nonempty Location
turnOut =
    triple minusZero goStraight turnLeft


autoTurnout : Nonempty Location
autoTurnout =
    triple minusZero goStraightOneHalf goStraightHalfThenTurnLeft


invert : IsInverted -> RailPiece -> RailPiece
invert inverted piece =
    case inverted of
        NotInverted ->
            piece

        Inverted ->
            Nonempty.map Location.invert piece


{-| レールピースをひっくり返す。途中にList.reverseが入るのはひっくり返すと時計回りになるのを反時計回りに戻すため。
-}
flip : IsFlipped -> RailPiece -> RailPiece
flip flipped piece =
    case flipped of
        NotFlipped ->
            piece

        Flipped ->
            Nonempty (Location.flip <| Nonempty.head piece) <|
                List.map Location.flip <|
                    List.reverse <|
                        Nonempty.tail piece


getRailPiece : Rail () IsFlipped -> RailPiece
getRailPiece rail =
    case rail of
        Straight _ ->
            straight

        Curve _ f ->
            flip f curve

        Turnout _ f ->
            flip f turnOut

        AutoTurnout ->
            autoTurnout


getAppropriateRailAndPieceForJoint : Joint -> Rail () IsFlipped -> Maybe ( Rail IsInverted IsFlipped, RailPiece )
getAppropriateRailAndPieceForJoint joint railType =
    let
        railPiece =
            getRailPiece railType
    in
    if Joint.match joint (Nonempty.head railPiece).joint then
        -- これから置く予定のレールと、スタックトップの方向がマッチしたのでそのまま配置する
        Just ( Rail.map (\_ -> Rail.NotInverted) railType, railPiece )

    else if Rail.canInvert railType then
        -- これから置くレールの凹凸を反転させることで配置することが可能である。
        Just ( Rail.map (\_ -> Rail.Inverted) railType, invert Rail.Inverted railPiece )

    else
        -- 凹凸がマッチしないため、配置することができない
        Nothing


placeRailPieceAtLocation : Location -> RailPiece -> List Location
placeRailPieceAtLocation base railPiece =
    List.map (Location.mul base) <| Nonempty.tail railPiece


type alias PlaceRailParams =
    { railType : Rail () IsFlipped
    , location : Location
    , rotation : Int
    }


type alias PlaceRailResult =
    { rail : Rail IsInverted IsFlipped
    , nextLocations : List Location
    , railPlacement : RailPlacement
    }


placeRail : PlaceRailParams -> Maybe PlaceRailResult
placeRail params =
    getAppropriateRailAndPieceForJoint params.location.joint params.railType
        |> Maybe.map
            (\( rail, railPiece ) ->
                { rail = rail
                , nextLocations = placeRailPieceAtLocation params.location railPiece
                , railPlacement = toRailPlacement rail params.location
                }
            )
