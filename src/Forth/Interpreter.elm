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


goStraight : Location
goStraight =
    Location.make (Rot45.make 4 0 0 0) Rot45.zero 0 Dir.e Joint.Plus


turnLeft : Location
turnLeft =
    Location.make (Rot45.make 0 0 4 -4) Rot45.zero 0 Dir.ne Joint.Plus


straight : Nonempty Location
straight =
    pair zero goStraight


curve : Nonempty Location
curve =
    pair zero turnLeft


turnOut : Nonempty Location
turnOut =
    triple zero goStraight turnLeft


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
            Nonempty (Location.flip <| Nonempty.head piece) <|
                List.map Location.flip <|
                    List.reverse <|
                        Nonempty.tail piece


getRailPiece : Rail IsInverted IsFlipped -> RailPiece
getRailPiece rail =
    case rail of
        Straight inv ->
            invert inv straight

        Curve inv f ->
            invert inv <| flip f curve

        Turnout inv f ->
            invert inv <| flip f turnOut


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
    executeRec (tokenize src) initialStatus


tokenize : String -> List String
tokenize string =
    String.words string


type alias ExecStatus =
    { stack : List Location
    , rails : List RailPlacement
    }


initialStatus : ExecStatus
initialStatus =
    { stack = [ Location.make Rot45.zero Rot45.zero 0 Dir.e Joint.Plus ]
    , rails = []
    }


toRailPlacement : Rail IsInverted IsFlipped -> Location -> RailPlacement
toRailPlacement rail location =
    RailPlacement.make rail (Location.originToVec3 location) (Dir.toRadian location.dir)


executeRec : List String -> ExecStatus -> ExecResult
executeRec toks status =
    case toks of
        [] ->
            haltWithSuccess status

        t :: ts ->
            case t of
                "" ->
                    executeRec ts status

                "(" ->
                    executeComment 1 ts status

                ")" ->
                    haltWithError "extra end comment ) found" status

                "." ->
                    executeDrop (executeRec ts) status

                "drop" ->
                    executeDrop (executeRec ts) status

                "swap" ->
                    executeSwap (executeRec ts) status

                "rot" ->
                    executeRot (executeRec ts) status

                "-rot" ->
                    executeInverseRot (executeRec ts) status

                "s" ->
                    executePlaceRail (executeRec ts) (Straight ()) status

                "l" ->
                    executePlaceRail (executeRec ts) (Curve () NotFlipped) status

                "r" ->
                    executePlaceRail (executeRec ts) (Curve () Flipped) status

                "tl" ->
                    executePlaceRail (executeRec ts) (Turnout () NotFlipped) status

                "tr" ->
                    executePlaceRail (executeRec ts) (Turnout () Flipped) status

                unknownWord ->
                    haltWithError ("Unknown word: " ++ unknownWord) status


executeDrop : (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeDrop cont status =
    case status.stack of
        [] ->
            haltWithError "Stack empty" status

        _ :: restOfStack ->
            cont { status | stack = restOfStack }


executeSwap : (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeSwap cont status =
    case status.stack of
        x :: y :: restOfStack ->
            cont { status | stack = y :: x :: restOfStack }

        _ ->
            haltWithError "stack should contain at least two elements" status


executeRot : (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeRot cont status =
    case status.stack of
        x :: y :: z :: restOfStack ->
            cont { status | stack = z :: x :: y :: restOfStack }

        _ ->
            haltWithError "stack should contain at least three elements" status


executeInverseRot : (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeInverseRot cont status =
    case status.stack of
        x :: y :: z :: restOfStack ->
            cont { status | stack = y :: z :: x :: restOfStack }

        _ ->
            haltWithError "stack should contain at least three elements" status


executeComment : Int -> List String -> ExecStatus -> ExecResult
executeComment depth tok status =
    if depth <= 0 then
        executeRec tok status

    else
        case tok of
            [] ->
                haltWithError "In comment line" status

            t :: ts ->
                case t of
                    "(" ->
                        executeComment (depth + 1) ts status

                    ")" ->
                        executeComment (depth - 1) ts status

                    _ ->
                        executeComment depth ts status


executePlaceRail : (ExecStatus -> ExecResult) -> Rail () IsFlipped -> ExecStatus -> ExecResult
executePlaceRail cont railType status =
    case status.stack of
        [] ->
            haltWithError "Stack empty" status

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
            cont nextStatus


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
haltWithError : ExecError -> ExecStatus -> ExecResult
haltWithError errMsg status =
    { rails = status.rails
    , errMsg = Just errMsg
    }


haltWithSuccess : ExecStatus -> ExecResult
haltWithSuccess status =
    { rails = status.rails
    , errMsg = Nothing
    }
