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


extendLocation : Location -> Location -> Location
extendLocation global local =
    let
        single =
            Rot45.add global.single <|
                Rot45.mul (Dir.toRot45 global.dir) local.single

        double =
            Rot45.add global.double <|
                Rot45.mul (Dir.toRot45 global.dir) local.double

        height =
            global.height + local.height

        dir =
            Dir.mul global.dir local.dir
    in
    Location.make single double height dir local.joint


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
                    case status.stack of
                        [] ->
                            haltWithError status "Stack empty"

                        top :: restOfStack ->
                            -- 直線レールのRailPieceを入手
                            -- top の極性に合わせて、それをinvert するかしないかをやる
                            -- - もし、invertできないレールの種類だったらエラーを吐く
                            -- 入手した RailPiece について、 top から生やすように分岐する
                            -- 当該種類のRailPieceを status.rails に追加
                            -- スタックに生えてきたRailPiece を積む
                            let
                                railType =
                                    Straight ()

                                rail =
                                    getRailMatchingCurrentJoint railType top.joint

                                railPiece =
                                    getRailPiece rail

                                stackElementsToPush =
                                    placeRailPieceAtLocation top railPiece

                                newRailPlacement =
                                    toRailPlacement rail top

                                nextStatus =
                                    { status
                                        | rails = newRailPlacement :: status.rails
                                        , stack = stackElementsToPush ++ restOfStack
                                    }
                            in
                            executeRec nextStatus ts

                -- "l" ->
                --     let
                --         rail =
                --             Curve NotFlipped
                --     in
                --     RailPlacement.make rail (Location.originToVec3 loc) (Dir.toRadian loc.dir)
                --         :: executeRec (getNextLocation loc rail) ts
                -- "r" ->
                --     let
                --         rail =
                --             Curve Flipped
                --     in
                --     RailPlacement.make rail (Location.originToVec3 loc) (Dir.toRadian loc.dir)
                --         :: executeRec (getNextLocation loc rail) ts
                "" ->
                    executeRec status ts

                unknownWord ->
                    haltWithError status ("Unknown word: " ++ unknownWord)


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
placeRailPieceAtLocation location railPiece =
    List.map (extendLocation location) <| Nonempty.tail railPiece


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
