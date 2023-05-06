module Forth.Interpreter exposing (ExecResult, emptyResult, execute)

import Forth.Geometry.Dir as Dir
import Forth.Geometry.Joint as Joint exposing (Joint)
import Forth.Geometry.Location as Location exposing (Location)
import Forth.Geometry.Rot45 as Rot45
import List.Nonempty as Nonempty exposing (Nonempty(..))
import Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import RailPlacement exposing (RailPlacement)


pair : a -> a -> Nonempty a
pair a b =
    Nonempty a [ b ]


triple : a -> a -> a -> Nonempty a
triple a b c =
    Nonempty a [ b, c ]


quadruple : a -> a -> a -> a -> Nonempty a
quadruple a b c d =
    Nonempty a [ b, c, d ]


type alias RailPiece =
    Nonempty Location


zero : Location
zero =
    Location.make Rot45.zero Rot45.zero 0 Dir.e Joint.Minus


straight : Nonempty Location
straight =
    pair
        zero
        (Location.make (Rot45.make 4 0 0 0) Rot45.zero 0 Dir.e Joint.Plus)


curve : Nonempty Location
curve =
    pair
        zero
        (Location.make (Rot45.make 0 0 4 -4) Rot45.zero 0 Dir.ne Joint.Plus)


invert : IsInverted -> RailPiece -> RailPiece
invert inverted piece =
    case inverted of
        NotInverted ->
            piece

        Inverted ->
            Nonempty.map Location.invert piece


flip : IsFlipped -> RailPiece -> RailPiece
flip flipped piece =
    case flipped of
        NotFlipped ->
            piece

        Flipped ->
            Nonempty.map Location.flip piece


getRailPiece : Rail IsInverted IsFlipped -> RailPiece
getRailPiece rail =
    case rail of
        Straight inv ->
            invert inv straight

        Curve inv f ->
            invert inv <| flip f curve

        _ ->
            Debug.todo "getRailPiece turnout"


type alias SourceCode =
    String


type alias ExecError =
    String


type alias ExecResult =
    { rails : List RailPlacement
    , errMsg : Maybe ExecError

    -- piers
    -- hukusen piers
    -- statistics :: count of rails...
    }


emptyResult : ExecResult
emptyResult =
    { rails = [], errMsg = Nothing }


execute : SourceCode -> ExecResult
execute src =
    executeRec initialStatus (tokenize src)


tokenize : String -> List String
tokenize =
    String.words


type alias ExecStatus =
    { stack : List Location
    , rails : List RailPlacement
    , commentNest : Int
    }


initialStatus : ExecStatus
initialStatus =
    { stack = [ Location.make Rot45.zero Rot45.zero 0 Dir.e Joint.Plus ]
    , rails = []
    , commentNest = 0
    }


toRailPlacement : Rail IsInverted IsFlipped -> Location -> RailPlacement
toRailPlacement rail location =
    RailPlacement.make rail (Location.originToVec3 location) (Dir.toRadian location.dir)


executeRec : ExecStatus -> List String -> ExecResult
executeRec status toks =
    case toks of
        [] ->
            haltWithSuccess status

        t :: ts ->
            case t of
                "pop" ->
                    case status.stack of
                        [] ->
                            haltWithError status "Stack empty"

                        _ :: restOfStack ->
                            executeRec { status | stack = restOfStack } ts

                "s" ->
                    case executeTryPlaceRail (Straight ()) status of
                        Nothing ->
                            haltWithError status "Stack empty"

                        Just nextStatus ->
                            executeRec nextStatus ts

                "l" ->
                    case executeTryPlaceRail (Curve () NotFlipped) status of
                        Nothing ->
                            haltWithError status "Stack empty"

                        Just nextStatus ->
                            executeRec nextStatus ts

                "r" ->
                    case executeTryPlaceRail (Curve () Flipped) status of
                        Nothing ->
                            haltWithError status "Stack empty"

                        Just nextStatus ->
                            executeRec nextStatus ts

                "" ->
                    executeRec status ts

                unknownWord ->
                    haltWithError status ("Unknown word: " ++ unknownWord)


executeTryPlaceRail : Rail () IsFlipped -> ExecStatus -> Maybe ExecStatus
executeTryPlaceRail railType status =
    case status.stack of
        [] ->
            Nothing

        -- Stack empty
        top :: restOfStack ->
            let
                -- railTypeを元に、極性を考慮したレールを作成
                -- TODO: 極性がうまくハマらなかった場合は失敗させる
                rail =
                    getRailMatchingCurrentJoint railType top.joint

                -- 入手した RailPiece について、 top から生やすように分岐する
                railPiece =
                    getRailPiece rail

                -- スタックに生えてきたRailPiece を積む
                stackElementsToPush =
                    placeRailPieceAtLocation top railPiece

                -- 当該種類のRailPieceを status.rails に追加
                newRailPlacement =
                    toRailPlacement rail top

                nextStatus =
                    { status
                        | rails = newRailPlacement :: status.rails
                        , stack = stackElementsToPush ++ restOfStack
                    }
            in
            Just nextStatus


getInversionWhenOriginIsMinus : Joint -> IsInverted
getInversionWhenOriginIsMinus joint =
    if joint == Joint.Plus then
        NotInverted

    else
        Inverted


getRailMatchingCurrentJoint : Rail () IsFlipped -> Joint -> Rail IsInverted IsFlipped
getRailMatchingCurrentJoint rail joint =
    case rail of
        Straight _ ->
            Straight <| getInversionWhenOriginIsMinus joint

        Curve _ flipped ->
            Curve (getInversionWhenOriginIsMinus joint) flipped

        Turnout _ flipped ->
            Turnout (getInversionWhenOriginIsMinus joint) flipped


{-| -}
placeRailPieceAtLocation : Location -> RailPiece -> List Location
placeRailPieceAtLocation base railPiece =
    List.map (Location.extend base) <| Nonempty.tail railPiece


{-| haltWithError
-}
haltWithError : ExecStatus -> ExecError -> ExecResult
haltWithError status errMsg =
    { rails = status.rails
    , errMsg = Just errMsg
    }


haltWithSuccess : ExecStatus -> ExecResult
haltWithSuccess status =
    { rails = status.rails
    , errMsg = Nothing
    }
