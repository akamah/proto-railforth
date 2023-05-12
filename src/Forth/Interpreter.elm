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


minusZero =
    Location.make Rot45.zero Rot45.zero 0 Dir.w Joint.Minus


plusZero =
    Location.make Rot45.zero Rot45.zero 0 Dir.w Joint.Plus


goStraight : Location
goStraight =
    Location.make (Rot45.make 4 0 0 0) Rot45.zero 0 Dir.e Joint.Plus


turnLeft : Location
turnLeft =
    Location.make (Rot45.make 0 0 4 -4) Rot45.zero 0 Dir.ne Joint.Plus


straight : Nonempty Location
straight =
    pair minusZero goStraight


curve : Nonempty Location
curve =
    pair minusZero turnLeft


turnOut : Nonempty Location
turnOut =
    triple minusZero goStraight turnLeft


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


getRailPieceWithInversion : Rail IsInverted IsFlipped -> RailPiece
getRailPieceWithInversion rail =
    case rail of
        Straight inv ->
            invert inv straight

        Curve inv f ->
            invert inv <| flip f curve

        Turnout inv f ->
            invert inv <| flip f turnOut


getRailPiece : Rail () IsFlipped -> RailPiece
getRailPiece rail =
    case rail of
        Straight _ ->
            straight

        Curve _ f ->
            flip f curve

        Turnout _ f ->
            flip f turnOut


toRailPlacement : Rail IsInverted IsFlipped -> Location -> RailPlacement
toRailPlacement rail location =
    RailPlacement.make rail (Location.originToVec3 location) (Dir.toRadian location.dir)


type alias ExecError =
    String


type alias ExecStatus =
    { stack : List Location
    , rails : List RailPlacement
    }


type alias ExecResult =
    { rails : List RailPlacement
    , errMsg : Maybe ExecError

    -- piers
    -- hukusen piers
    -- statistics :: count of rails...
    }


{-| エディタなどで何もしていないときに最初に表示されることを想定
-}
emptyResult : ExecResult
emptyResult =
    execute ""


execute : String -> ExecResult
execute src =
    executeRec (tokenize src) initialStatus


tokenize : String -> List String
tokenize string =
    String.words string


initialStatus : ExecStatus
initialStatus =
    { stack = [ Location.make Rot45.zero Rot45.zero 0 Dir.e Joint.Minus ]
    , rails = []
    }


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
                    executePlaceRail2 (executeRec ts) (Straight ()) status

                "l" ->
                    executePlaceRail2 (executeRec ts) (Curve () NotFlipped) status

                "r" ->
                    executePlaceRail2 (executeRec ts) (Curve () Flipped) status

                "tl" ->
                    executePlaceRail2 (executeRec ts) (Turnout () NotFlipped) status

                "tr" ->
                    executePlaceRail2 (executeRec ts) (Turnout () Flipped) status

                undefinedWord ->
                    haltWithError ("Undefined word: " ++ undefinedWord) status


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
                haltWithError "[comment]" status

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
                    getRailPieceWithInversion rail

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


getAppropriateRaiAndRailPieceForJoint : Joint -> Rail () IsFlipped -> Maybe ( Rail IsInverted IsFlipped, RailPiece )
getAppropriateRaiAndRailPieceForJoint joint railType =
    let
        railPiece =
            getRailPiece railType
    in
    if Joint.match joint (Nonempty.head railPiece).joint then
        -- これから置く予定のレールと、スタックトップの方向がマッチしたのでそのまま配置する
        Just ( Rail.map (\_ -> Rail.NotInverted) railType, railPiece )

    else if Rail.canInvert railType then
        -- 凹凸を反転させる必要がある。
        Just ( Rail.map (\_ -> Rail.Inverted) railType, invert Rail.Inverted railPiece )

    else
        -- 打つ手が無いので、失敗させる
        Nothing


executePlaceRail2 : (ExecStatus -> ExecResult) -> Rail () IsFlipped -> ExecStatus -> ExecResult
executePlaceRail2 cont railType status =
    case status.stack of
        [] ->
            haltWithError "Stack empty" status

        top :: restOfStack ->
            case getAppropriateRaiAndRailPieceForJoint top.joint railType of
                Just ( rail, railPiece ) ->
                    cont
                        { status
                            | rails = toRailPlacement rail top :: status.rails
                            , stack = placeRailPieceAtLocation top railPiece ++ restOfStack
                        }

                Nothing ->
                    haltWithError "Joint mismatch" status



-- executePlaceRailPiece : (ExecStatus -> ExecResult) -> RailPiece -> ExecStatus -> ExecResult
-- executePlaceRailPiece cont railPiece status =


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
    List.map (Location.mul base) <| Nonempty.tail railPiece



-- requireStackTop : (Location -> ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
-- requireStackTop cont status =
--     case status.stack of
--         [] ->
--             haltWithError "Stack empty" status
--         top :: restOfStack ->
--             cont top { status | stack = restOfStack }


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
