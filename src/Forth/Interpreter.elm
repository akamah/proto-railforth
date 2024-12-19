module Forth.Interpreter exposing (ExecResult, execute)

import Dict exposing (Dict)
import Forth.Geometry.RailLocation as RailLocation exposing (RailLocation)
import Forth.PierConstruction as PierConstruction
import Forth.RailPiece as RailPiece
import Forth.RailPlacement as RailPlacement exposing (RailPlacement)
import Forth.Statistics as Statistics
import Types.Pier exposing (Pier(..))
import Types.PierRenderData exposing (PierRenderData)
import Types.Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import Types.RailRenderData exposing (RailRenderData)


type alias Word =
    String


{-| Forthの状態。スタックがあり、そのほか余計な情報がある。
-}
type alias ForthStatus stack global =
    { stack : List stack
    , global : global
    , savepoints : List (Dict Word stack)
    , frame : List (Dict Word FrameEntry)
    }


{-| 状態に突っ込むための型
-}
type FrameEntry
    = FrameEntry (List Exec)


type alias ExecError =
    { message : String
    , status : ExecStatus
    }


type alias AnalyzeError =
    String


type alias ExecStatus =
    ForthStatus
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

        initialStatus : ExecStatus
        initialStatus =
            { stack = [ RailPiece.initialLocation ]
            , global = { rails = [] }
            , savepoints = [ Dict.empty ]
            , frame = [ Dict.empty ]
            }
    in
    case analyzeWords tokens of
        Ok execs ->
            case executeMulti execs initialStatus of
                Ok finalStatus ->
                    haltWithSuccess finalStatus

                Err execError ->
                    haltWithError execError

        -- the status is STUB
        Err analyzeError ->
            haltWithError (ExecError analyzeError initialStatus)



-- STUB too


type alias Exec =
    ExecStatus -> Result ExecError ExecStatus



--  辞書の定義


{-| -}
controlWords : Dict Word (List Word -> Result AnalyzeError ( Exec, List Word ))
controlWords =
    Dict.fromList
        [ ( "(", analyzeComment 1 )
        , ( ")", \_ -> Err "余分なコメント終了文字 ) があります" )
        , ( "save", analyzeSave )
        , ( "load", analyzeLoad )
        , ( ":", analyzeWordDef )
        , ( ";", \_ -> Err "ワードの定義の外で ; が出現しました" )
        ]


coreGlossary : Dict Word Exec
coreGlossary =
    Dict.fromList
        [ ( "", Ok {- do nothing -} )
        , ( ".", executeDrop )
        , ( "drop", executeDrop )
        , ( "swap", executeSwap )
        , ( "rot", executeRot )
        , ( "-rot", executeInverseRot )
        , ( "nip", executeNip )
        ]


railForthGlossary : Dict Word Exec
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


analyzeNormalWord : Word -> Exec
analyzeNormalWord word =
    case Dict.get word coreGlossary of
        Just exec ->
            exec

        Nothing ->
            case Dict.get word railForthGlossary of
                Just exec ->
                    exec

                Nothing ->
                    executeWordInFrame word


getFromDicts : comparable -> List (Dict comparable v) -> Maybe v
getFromDicts k dicts =
    case dicts of
        [] ->
            Nothing

        d :: ds ->
            case Dict.get k d of
                Just v ->
                    Just v

                Nothing ->
                    getFromDicts k ds


executeWordInFrame : Word -> Exec
executeWordInFrame word status =
    case getFromDicts word status.frame of
        Just (FrameEntry execs) ->
            executeInNestedFrame (executeMulti execs) status

        Nothing ->
            Err <| ExecError ("未定義のワードです: " ++ word) status


executeInNestedFrame : Exec -> Exec
executeInNestedFrame exec status =
    let
        extendedStatus =
            { status
                | frame = Dict.empty :: status.frame
                , savepoints = Dict.empty :: status.savepoints
            }
    in
    case exec extendedStatus of
        Ok status2 ->
            case ( status2.frame, status2.savepoints ) of
                ( _ :: oldFrame, _ :: oldSavepoints ) ->
                    Ok { status2 | frame = oldFrame, savepoints = oldSavepoints }

                _ ->
                    Err <| ExecError "フレームがなんか変です" status2

        Err err ->
            Err err


{-| 与えられた複数のワードをパースする
-}
analyzeWordsRec : List Exec -> List Word -> Result AnalyzeError (List Exec)
analyzeWordsRec accum toks =
    case toks of
        [] ->
            Ok (List.reverse accum)

        t :: ts ->
            case Dict.get t controlWords of
                Just analyzer ->
                    case analyzer ts of
                        Ok ( exec, restToks ) ->
                            analyzeWordsRec (exec :: accum) restToks

                        Err err ->
                            Err err

                Nothing ->
                    case analyzeNormalWord t of
                        exec ->
                            analyzeWordsRec (exec :: accum) ts


analyzeWords : List Word -> Result AnalyzeError (List Exec)
analyzeWords toks =
    analyzeWordsRec [] toks


executeMulti : List Exec -> Exec
executeMulti execs status =
    case execs of
        e :: es ->
            case e status of
                Ok nextStatus ->
                    executeMulti es nextStatus

                Err err ->
                    Err err

        [] ->
            Ok status


{-| haltWithError
-}
haltWithError : ExecError -> ExecResult
haltWithError err =
    { rails = List.map RailPlacement.toRailRenderData err.status.global.rails
    , errMsg = Just err.message
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


executeDrop : Exec
executeDrop status =
    case status.stack of
        [] ->
            Err <| ExecError "スタックが空です" status

        _ :: restOfStack ->
            Ok { status | stack = restOfStack }


executeSwap : Exec
executeSwap status =
    case status.stack of
        x :: y :: restOfStack ->
            Ok { status | stack = y :: x :: restOfStack }

        _ ->
            Err <| ExecError "スタックに最低2つの要素がある必要があります" status


executeRot : Exec
executeRot status =
    case status.stack of
        x :: y :: z :: restOfStack ->
            Ok { status | stack = z :: x :: y :: restOfStack }

        _ ->
            Err <| ExecError "スタックに最低3つの要素がある必要があります" status


executeInverseRot : Exec
executeInverseRot status =
    case status.stack of
        x :: y :: z :: restOfStack ->
            Ok { status | stack = y :: z :: x :: restOfStack }

        _ ->
            Err <| ExecError "スタックに最低3つの要素がある必要があります" status


executeNip : Exec
executeNip status =
    case status.stack of
        x :: _ :: restOfStack ->
            Ok { status | stack = x :: restOfStack }

        _ ->
            Err <| ExecError "スタックに最低2つの要素がある必要があります" status


analyzeComment : Int -> List Word -> Result AnalyzeError ( Exec, List Word )
analyzeComment depth toks =
    if depth <= 0 then
        Ok ( Ok, toks )

    else
        case toks of
            [] ->
                Err "コメント文の終了が見つかりません"

            "(" :: ts ->
                analyzeComment (depth + 1) ts

            ")" :: ts ->
                analyzeComment (depth - 1) ts

            _ :: ts ->
                analyzeComment depth ts


splitAt : comparable -> List comparable -> Maybe ( List comparable, List comparable )
splitAt needle list =
    let
        splitAtRec accum rest =
            case rest of
                [] ->
                    Nothing

                x :: xs ->
                    if x == needle then
                        Just ( List.reverse accum, xs )

                    else
                        splitAtRec (x :: accum) xs
    in
    splitAtRec [] list


analyzeWordDef : List Word -> Result AnalyzeError ( Exec, List Word )
analyzeWordDef toks =
    case toks of
        name :: toks2 ->
            case splitAt ";" toks2 of
                Just ( bodyToks, restToks ) ->
                    case analyzeWords bodyToks of
                        Ok thread ->
                            Ok ( buildWordDef name thread, restToks )

                        Err err ->
                            Err err

                Nothing ->
                    Err "ワードの定義の末尾に ; がありません"

        [] ->
            Err "ワード定義の名前がありません"


buildWordDef : Word -> List Exec -> Exec
buildWordDef name thread status =
    case status.frame of
        f :: fs ->
            Ok { status | frame = Dict.insert name (FrameEntry thread) f :: fs }

        [] ->
            Err <| ExecError "致命的エラーがワードの定義時に発生しました" status


analyzeSave : List Word -> Result AnalyzeError ( Exec, List Word )
analyzeSave toks =
    case toks of
        name :: restToks ->
            Ok ( doSave name, restToks )

        [] ->
            Err "セーブする定数の名前を与えてください"


doSave : Word -> Exec
doSave name status =
    case status.savepoints of
        env :: envs ->
            case status.stack of
                top :: restOfStack ->
                    Ok
                        { status
                            | savepoints = Dict.insert name top env :: envs
                            , stack = restOfStack
                        }

                _ ->
                    Err <| ExecError "save時のスタックが空です" status

        [] ->
            Err <| ExecError "致命的なエラーがsaveで発生しました" status


analyzeLoad : List Word -> Result AnalyzeError ( Exec, List Word )
analyzeLoad toks =
    case toks of
        name :: restToks ->
            Ok ( doLoad name, restToks )

        [] ->
            Err "ロードする定数の名前を与えてください"


{-| 変数のルックアップでは上の方にたどらない。セーブした変数はロードしたら消えるということは、同じ階層で使ってほしいため
-}
doLoad : Word -> Exec
doLoad name status =
    case status.savepoints of
        env :: envs ->
            case Dict.get name env of
                Just val ->
                    Ok
                        { status
                            | savepoints = Dict.remove name env :: envs
                            , stack = val :: status.stack
                        }

                Nothing ->
                    Err <| ExecError ("セーブポイント (" ++ name ++ ") が見つかりません") status

        [] ->
            Err <| ExecError "致命的なエラーがloadで発生しました" status


executePlaceRail : Rail () IsFlipped -> Int -> Exec
executePlaceRail railType rotation =
    let
        railPlaceFunc =
            RailPiece.placeRail railType rotation
    in
    \status ->
        case status.stack of
            [] ->
                Err <| ExecError "スタックが空です" status

            top :: restOfStack ->
                case railPlaceFunc top of
                    Just { nextLocations, railPlacement } ->
                        Ok
                            { status
                                | stack = nextLocations ++ restOfStack
                                , global =
                                    { rails = railPlacement :: status.global.rails
                                    }
                            }

                    Nothing ->
                        Err <| ExecError "配置するレールの凹凸が合いません" status


executeAscend : Int -> Exec
executeAscend amount status =
    case status.stack of
        [] ->
            Err <| ExecError "スタックが空です" status

        top :: restOfStack ->
            Ok { status | stack = RailLocation.addHeight amount top :: restOfStack }


executeInvert : Exec
executeInvert status =
    case status.stack of
        [] ->
            Err <| ExecError "スタックが空です" status

        top :: restOfStack ->
            Ok { status | stack = RailLocation.invertJoint top :: restOfStack }
