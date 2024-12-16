module Forth.Interpreter exposing (ExecResult, execute)

import Dict exposing (Dict)
import Forth.Geometry.RailLocation as RailLocation exposing (RailLocation)
import Forth.PierConstruction as PierConstruction
import Forth.RailPiece as RailPiece
import Forth.RailPlacement as RailPlacement exposing (RailPlacement)
import Forth.Statistics as Statistics
import Forth.Validator as Validator
import Types.Pier exposing (Pier(..))
import Types.PierRenderData exposing (PierRenderData)
import Types.Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import Types.RailRenderData exposing (RailRenderData)


type alias Word =
    String


{-| Forthの状態。スタックがあり、そのほか余計な情報がある。
-}
type alias ForthStatus result stack global =
    { stack : List stack
    , global : global
    , savepoints : Dict Word stack
    , frame : Dict Word (Cont result stack global)
    }


{-| Continuation
-}
type Cont result stack global
    = Cont
        ((ForthStatus result stack global -> result)
         -> ForthStatus result stack global
         -> result
        )


type alias ExecError =
    String


type alias ForthError =
    String


type alias ExecStatus =
    ForthStatus
        ExecResult
        RailLocation
        { rails : List RailPlacement
        }


type alias ExecResult =
    { rails : List RailRenderData
    , piers : List PierRenderData
    , errMsg : Maybe String
    , railCount : Dict String Int
    }


execute : String -> ExecResult
execute src =
    let
        tokens : List Word
        tokens =
            String.words src

        thread : Thread
        thread =
            analyzeWords tokens

        initialStatus : ExecStatus
        initialStatus =
            { stack = [ RailPiece.initialLocation ]
            , global = { rails = [] }
            , savepoints = Dict.empty
            , frame = Dict.empty
            }
    in
    thread haltWithError haltWithSuccess initialStatus


{-| Forthの普遍的なワードで、Railforthとしてのワードではないもの。スタック操作など
-}
type alias CoreWord result stack global =
    (ForthError -> ForthStatus result stack global -> result)
    -> (ForthStatus result stack global -> result)
    -> ForthStatus result stack global
    -> result


{-| 気持ち: 失敗した際にそれを報告する継続、成功した際の継続、現在の状態を受け取り、いい感じに結果を作るみたいなやつ
よく見たらもう上とほとんど同じやな
-}
type alias Thread =
    (ForthError -> ExecStatus -> ExecResult)
    -> (ExecStatus -> ExecResult)
    -> ExecStatus
    -> ExecResult


{-| -}
controlWords : Dict Word (List Word -> ( Thread, List Word ))
controlWords =
    Dict.fromList
        [ ( "(", analyzeComment 1 )
        , ( ")", \toks -> ( fail "余分なコメント終了文字 ) があります", toks ) )
        , ( "save", analyzeSave )
        , ( "load", analyzeLoad )

        --        , ( ":", executeWordDef )
        , ( ";", \toks -> ( fail "ワードの定義の外で ; が出現しました", toks ) )
        ]


coreGlossary : Dict Word (CoreWord result stack global)
coreGlossary =
    Dict.fromList
        [ ( "", \_ cont status -> cont status {- do nothing -} )
        , ( ".", executeDrop )
        , ( "drop", executeDrop )
        , ( "swap", executeSwap )
        , ( "rot", executeRot )
        , ( "-rot", executeInverseRot )
        , ( "nip", executeNip )
        ]


railForthGlossary : Dict Word Thread
railForthGlossary =
    Dict.fromList
        [ ( "q", executePlaceRail (Straight1 ()) 0 )
        , ( "h", executePlaceRail (Straight2 ()) 0 )
        , ( "s", executePlaceRail (Straight4 ()) 0 )
        , ( "ss", executePlaceRail (Straight8 ()) 0 )
        , ( "dts", executePlaceRail (DoubleStraight4 ()) 0 )
        , ( "dts1", executePlaceRail (DoubleStraight4 ()) 1 )
        , ( "l", executePlaceRail (Curve45 NotFlipped ()) 0 )
        , ( "ll", executePlaceRail (Curve90 NotFlipped ()) 0 )
        , ( "r", executePlaceRail (Curve45 Flipped ()) 0 )
        , ( "rr", executePlaceRail (Curve90 Flipped ()) 0 )
        , ( "ol", executePlaceRail (OuterCurve45 NotFlipped ()) 0 )
        , ( "or", executePlaceRail (OuterCurve45 Flipped ()) 0 )
        , ( "dtl", executePlaceRail (DoubleCurve45 NotFlipped ()) 0 )
        , ( "dtl1", executePlaceRail (DoubleCurve45 NotFlipped ()) 1 )
        , ( "dtr", executePlaceRail (DoubleCurve45 Flipped ()) 0 )
        , ( "dtr3", executePlaceRail (DoubleCurve45 Flipped ()) 3 )
        , ( "tl", executePlaceRail (Turnout NotFlipped ()) 0 )
        , ( "tl1", executePlaceRail (Turnout NotFlipped ()) 1 )
        , ( "tl2", executePlaceRail (Turnout NotFlipped ()) 2 )
        , ( "tr", executePlaceRail (Turnout Flipped ()) 0 )
        , ( "tr1", executePlaceRail (Turnout Flipped ()) 1 )
        , ( "tr2", executePlaceRail (Turnout Flipped ()) 2 )
        , ( "dl", executePlaceRail (SingleDouble NotFlipped ()) 0 )
        , ( "dl1", executePlaceRail (SingleDouble NotFlipped ()) 1 )
        , ( "dl2", executePlaceRail (SingleDouble NotFlipped ()) 2 )
        , ( "dr", executePlaceRail (SingleDouble Flipped ()) 0 )
        , ( "dr1", executePlaceRail (SingleDouble Flipped ()) 1 )
        , ( "dr2", executePlaceRail (SingleDouble Flipped ()) 2 )
        , ( "dwl", executePlaceRail (DoubleWide NotFlipped ()) 0 )
        , ( "dwl1", executePlaceRail (DoubleWide NotFlipped ()) 1 )
        , ( "dwl2", executePlaceRail (DoubleWide NotFlipped ()) 2 )
        , ( "dwl3", executePlaceRail (DoubleWide NotFlipped ()) 3 )
        , ( "dwr", executePlaceRail (DoubleWide Flipped ()) 0 )
        , ( "dwr1", executePlaceRail (DoubleWide Flipped ()) 1 )
        , ( "dwr2", executePlaceRail (DoubleWide Flipped ()) 2 )
        , ( "dwr3", executePlaceRail (DoubleWide Flipped ()) 3 )
        , ( "el", executePlaceRail (EightPoint NotFlipped ()) 0 )
        , ( "el1", executePlaceRail (EightPoint NotFlipped ()) 1 )
        , ( "el2", executePlaceRail (EightPoint NotFlipped ()) 2 )
        , ( "er", executePlaceRail (EightPoint Flipped ()) 0 )
        , ( "er1", executePlaceRail (EightPoint Flipped ()) 1 )
        , ( "er2", executePlaceRail (EightPoint Flipped ()) 2 )
        , ( "j", executePlaceRail (JointChange ()) 0 )
        , ( "up", executePlaceRail (Slope NotFlipped ()) 0 )
        , ( "dn", executePlaceRail (Slope Flipped ()) 0 )
        , ( "sa", executePlaceRail SlopeCurveA 0 )
        , ( "sa1", executePlaceRail SlopeCurveA 1 )
        , ( "sb", executePlaceRail SlopeCurveB 0 )
        , ( "sb1", executePlaceRail SlopeCurveB 1 )
        , ( "shl", executePlaceRail (Shift NotFlipped ()) 0 )
        , ( "shr", executePlaceRail (Shift Flipped ()) 0 )
        , ( "stop", executePlaceRail (Stop ()) 0 )
        , ( "at", executePlaceRail AutoTurnout 0 )
        , ( "at1", executePlaceRail AutoTurnout 1 )
        , ( "at2", executePlaceRail AutoTurnout 2 )
        , ( "ap", executePlaceRail AutoPoint 0 )
        , ( "ap1", executePlaceRail AutoPoint 1 )
        , ( "ap2", executePlaceRail AutoPoint 2 )
        , ( "ap3", executePlaceRail AutoPoint 3 )
        , ( "ac", executePlaceRail AutoCross 0 )
        , ( "ac1", executePlaceRail AutoCross 1 )
        , ( "ac2", executePlaceRail AutoCross 2 )
        , ( "ac3", executePlaceRail AutoCross 3 )
        , ( "uturn", executePlaceRail UTurn 0 )
        , ( "uturn1", executePlaceRail UTurn 1 )
        , ( "owl", executePlaceRail (Oneway NotFlipped) 0 )
        , ( "owl1", executePlaceRail (Oneway NotFlipped) 1 )
        , ( "owl2", executePlaceRail (Oneway NotFlipped) 2 )
        , ( "owr", executePlaceRail (Oneway Flipped) 0 )
        , ( "owr1", executePlaceRail (Oneway Flipped) 1 )
        , ( "owr2", executePlaceRail (Oneway Flipped) 2 )
        , ( "dc", executePlaceRail WideCross 0 )
        , ( "dc1", executePlaceRail WideCross 1 )
        , ( "fw", executePlaceRail (Forward ()) 0 )
        , ( "bk", executePlaceRail (Backward ()) 0 )
        , ( "ascend", executeAscend 4 )
        , ( "invert", executeInvert )
        ]


{-| 無条件で成功するスレッド
-}
success : Thread
success _ cont status =
    cont status


{-| エラーメッセージとともに失敗するスレッド
-}
fail : ForthError -> Thread
fail msg err _ status =
    err msg status


sequence : Thread -> Thread -> Thread
sequence x y =
    \err cont ->
        x err (y err cont)


analyzeWords : List Word -> Thread
analyzeWords toks =
    -- TODO: tail recursion
    case toks of
        [] ->
            success

        t :: ts ->
            case Dict.get t controlWords of
                Just analyzer ->
                    let
                        ( thread, restToks ) =
                            analyzer ts
                    in
                    sequence thread <| analyzeWords restToks

                Nothing ->
                    case Dict.get t coreGlossary of
                        Just thread ->
                            sequence thread <| analyzeWords ts

                        Nothing ->
                            case Dict.get t railForthGlossary of
                                Just thread ->
                                    sequence thread <| analyzeWords ts

                                Nothing ->
                                    fail ("未定義のワードです: " ++ t)


{-| haltWithError
-}
haltWithError : ExecError -> ExecStatus -> ExecResult
haltWithError errMsg status =
    { rails = List.map RailPlacement.toRailRenderData status.global.rails
    , errMsg = Just errMsg
    , railCount = Dict.empty
    , piers = []
    }


haltWithSuccess : ExecStatus -> ExecResult
haltWithSuccess status =
    case PierConstruction.toPierRenderData (List.concatMap RailPiece.getPierLocations status.global.rails) of
        Ok pierRenderData ->
            { rails = List.map RailPlacement.toRailRenderData status.global.rails
            , errMsg = Nothing
            , railCount = Statistics.getRailCount <| List.map (\x -> x.rail) status.global.rails
            , piers = pierRenderData
            }

        Err err ->
            { rails = List.map RailPlacement.toRailRenderData status.global.rails
            , errMsg = Just err
            , railCount = Statistics.getRailCount <| List.map (\x -> x.rail) status.global.rails
            , piers = []
            }


executeDrop : CoreWord result stack global
executeDrop err cont status =
    case status.stack of
        [] ->
            err "スタックが空です" status

        _ :: restOfStack ->
            cont { status | stack = restOfStack }


executeSwap : CoreWord result stack global
executeSwap err cont status =
    case status.stack of
        x :: y :: restOfStack ->
            cont { status | stack = y :: x :: restOfStack }

        _ ->
            err "スタックに最低2つの要素がある必要があります" status


executeRot : CoreWord result stack global
executeRot err cont status =
    case status.stack of
        x :: y :: z :: restOfStack ->
            cont { status | stack = z :: x :: y :: restOfStack }

        _ ->
            err "スタックに最低3つの要素がある必要があります" status


executeInverseRot : CoreWord result stack global
executeInverseRot err cont status =
    case status.stack of
        x :: y :: z :: restOfStack ->
            cont { status | stack = y :: z :: x :: restOfStack }

        _ ->
            err "スタックに最低3つの要素がある必要があります" status


executeNip : CoreWord result stack global
executeNip err cont status =
    case status.stack of
        x :: _ :: restOfStack ->
            cont { status | stack = x :: restOfStack }

        _ ->
            err "スタックに最低2つの要素がある必要があります" status


analyzeComment : Int -> List Word -> ( Thread, List Word )
analyzeComment depth toks =
    if depth <= 0 then
        ( success, toks )

    else
        case toks of
            [] ->
                ( fail "[コメント文]", toks )

            "(" :: ts ->
                analyzeComment (depth + 1) ts

            ")" :: ts ->
                analyzeComment (depth - 1) ts

            _ :: ts ->
                analyzeComment depth ts



-- splitAt : comparable -> List comparable -> Maybe ( List comparable, List comparable )
-- splitAt needle list =
--     let
--         splitAtRec accum rest =
--             case rest of
--                 [] ->
--                     Nothing
--                 x :: xs ->
--                     if x == needle then
--                         Just ( List.reverse accum, xs )
--                     else
--                         splitAtRec (x :: accum) xs
--     in
--     splitAtRec [] list
-- sequence : ((a -> b) -> a -> b) -> ((a -> b) -> a -> b) -> ((a -> b) -> a -> b)
-- sequence f g =
--     \k -> f (g k)
-- executeWordDef : List Word -> ExecStatus -> ExecResult
-- executeWordDef toks =
--     case splitAt ";" toks of
--         Nothing ->
--             \status -> haltWithError status "[ワード定義]"
--         Just ( body, rest ) ->
--             case t of
--                 ";" ->
--                     let
--                         thread =
--                             executeRec body
--                     in
--                     \status -> executeComment (depth + 1) ts status
--                 _ ->
--                     executeComment depth ts status


analyzeSave : List Word -> ( Thread, List Word )
analyzeSave toks =
    case toks of
        name :: restToks ->
            ( doSave name, restToks )

        [] ->
            ( fail "セーブする定数の名前を与えてください", toks )


doSave : Word -> Thread
doSave name err cont status =
    case status.stack of
        top :: restOfStack ->
            cont
                { status
                    | savepoints = Dict.insert name top status.savepoints
                    , stack = restOfStack
                }

        _ ->
            err "save時のスタックが空です" status


analyzeLoad : List Word -> ( Thread, List Word )
analyzeLoad toks =
    case toks of
        name :: restToks ->
            ( doLoad name, restToks )

        [] ->
            ( fail "ロードする定数の名前を与えてください", toks )


doLoad : Word -> Thread
doLoad name err cont status =
    case Dict.get name status.savepoints of
        Just val ->
            cont
                { status
                    | savepoints = Dict.remove name status.savepoints
                    , stack = val :: status.stack
                }

        Nothing ->
            err ("セーブポイント (" ++ name ++ ") が見つかりません") status


executePlaceRail : Rail () IsFlipped -> Int -> Thread
executePlaceRail railType rotation =
    let
        railPlaceFunc =
            RailPiece.placeRail railType rotation
    in
    \err cont status ->
        case status.stack of
            [] ->
                err "スタックが空です" status

            top :: restOfStack ->
                case railPlaceFunc top of
                    Just { nextLocations, railPlacement } ->
                        cont
                            { status
                                | stack = nextLocations ++ restOfStack
                                , global =
                                    { rails = railPlacement :: status.global.rails
                                    }
                            }

                    Nothing ->
                        err "配置するレールの凹凸が合いません" status


executeAscend : Int -> Thread
executeAscend amount err cont status =
    case status.stack of
        [] ->
            err "スタックが空です" status

        top :: restOfStack ->
            cont { status | stack = RailLocation.addHeight amount top :: restOfStack }


executeInvert : Thread
executeInvert err cont status =
    case status.stack of
        [] ->
            err "スタックが空です" status

        top :: restOfStack ->
            cont { status | stack = RailLocation.invertJoint top :: restOfStack }
