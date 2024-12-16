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
        tokenize : String -> List Word
        tokenize string =
            String.words string

        initialStatus : ExecStatus
        initialStatus =
            { stack = [ RailPiece.initialLocation ]
            , global = { rails = [] }
            , savepoints = Dict.empty
            , frame = Dict.empty
            }
    in
    executeRec (tokenize src) initialStatus


{-| Forthの普遍的なワードで、Railforthとしてのワードではないもの。スタック操作など
-}
type alias CoreWord result stack global =
    (ForthStatus result stack global -> result)
    -> (ForthStatus result stack global -> ForthError -> result)
    -> ForthStatus result stack global
    -> result


coreGlossary : Dict Word (CoreWord result stack global)
coreGlossary =
    Dict.fromList
        [ ( "", \cont _ status -> cont status {- do nothing -} )
        , ( ".", executeDrop )
        , ( "drop", executeDrop )
        , ( "swap", executeSwap )
        , ( "rot", executeRot )
        , ( "-rot", executeInverseRot )
        , ( "nip", executeNip )
        ]


{-| -}
controlWords : Dict Word (List Word -> ExecStatus -> ExecResult)
controlWords =
    Dict.fromList
        [ ( "(", executeComment 1 )
        , ( ")", \_ status -> haltWithError status "余分なコメント終了文字 ) があります" )
        , ( "save", executeSave )
        , ( "load", executeLoad )

        --        , ( ":", executeWordDef )
        , ( ";", \_ status -> haltWithError status "ワードの定義の外で ; が出現しました" )
        ]


railForthGlossary : Dict Word ((ExecStatus -> ExecResult) -> ExecStatus -> ExecResult)
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


executeRec : List Word -> ExecStatus -> ExecResult
executeRec toks =
    case toks of
        [] ->
            \status -> haltWithSuccess status

        t :: ts ->
            case Dict.get t controlWords of
                Just thread ->
                    \status -> thread ts status

                Nothing ->
                    case Dict.get t coreGlossary of
                        Just thread ->
                            \status -> thread (executeRec ts) haltWithError status

                        Nothing ->
                            case Dict.get t railForthGlossary of
                                Just thread ->
                                    \status -> thread (executeRec ts) status

                                Nothing ->
                                    \status -> haltWithError status ("未定義のワードです: " ++ t)


type alias Thread =
    (ForthError -> ExecStatus -> ExecResult) -> (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult


success : Thread
success _ cont status =
    cont status


fail : ForthError -> Thread
fail msg err _ status =
    err msg status



-- analyzeWords : List Word -> Thread
-- analyzeWords toks =
--     case toks of
--         [] ->
--             success
--         t :: ts ->
--             case Dict.get t controlWords of
--                 Just thread ->
--                     \err cont status -> thread ts status
--                 Nothing ->
--                     case Dict.get t coreGlossary of
--                         Just thread ->
--                             let
--                                 rest =
--                                     analyzeWords toks
--                             in
--                             \err cont status -> thread (\s -> rest err cont s) err status
--                         Nothing ->
--                             case Dict.get t railForthGlossary of
--                                 Just thread ->
--                                     let
--                                         rest =
--                                             analyzeWords toks
--                                     in
--                                     \err cont status -> thread (rest err cont) status
--                                 Nothing ->
--                                     \err _ _ -> err ("未定義のワードです: " ++ t)


{-| haltWithError
-}
haltWithError : ExecStatus -> ExecError -> ExecResult
haltWithError status errMsg =
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
executeDrop cont err status =
    case status.stack of
        [] ->
            err status "スタックが空です"

        _ :: restOfStack ->
            cont { status | stack = restOfStack }


executeSwap : CoreWord result stack global
executeSwap cont err status =
    case status.stack of
        x :: y :: restOfStack ->
            cont { status | stack = y :: x :: restOfStack }

        _ ->
            err status "スタックに最低2つの要素がある必要があります"


executeRot : CoreWord result stack global
executeRot cont err status =
    case status.stack of
        x :: y :: z :: restOfStack ->
            cont { status | stack = z :: x :: y :: restOfStack }

        _ ->
            err status "スタックに最低3つの要素がある必要があります"


executeInverseRot : CoreWord result stack global
executeInverseRot cont err status =
    case status.stack of
        x :: y :: z :: restOfStack ->
            cont { status | stack = y :: z :: x :: restOfStack }

        _ ->
            err status "スタックに最低3つの要素がある必要があります"


executeNip : CoreWord result stack global
executeNip cont err status =
    case status.stack of
        x :: _ :: restOfStack ->
            cont { status | stack = x :: restOfStack }

        _ ->
            err status "スタックに最低2つの要素がある必要があります"


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


executeComment : Int -> List Word -> ExecStatus -> ExecResult
executeComment depth toks status =
    let
        ( thread, nextToks ) =
            analyzeComment depth toks
    in
    thread (\e s -> haltWithError s e) (executeRec nextToks) status



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


{-| 現在の位置に名前をつけて保存する。
-}
executeSave : List Word -> ExecStatus -> ExecResult
executeSave toks status =
    case ( toks, status.stack ) of
        ( name :: restToks, top :: restOfStack ) ->
            let
                nextStatus =
                    { status
                        | savepoints = Dict.insert name top status.savepoints
                        , stack = restOfStack
                    }
            in
            executeRec restToks nextStatus

        ( _ :: _, _ ) ->
            haltWithError status "定義時のスタックが空です"

        _ ->
            haltWithError status "セーブする定数の名前を与えてください"


{-| 名前をつけて保存した位置をロードする。一度ロードすると消えてしまう
-}
executeLoad : List Word -> ExecStatus -> ExecResult
executeLoad toks status =
    case toks of
        name :: restToks ->
            case Dict.get name status.savepoints of
                Just val ->
                    let
                        nextStatus =
                            { status
                                | savepoints = Dict.remove name status.savepoints
                                , stack = val :: status.stack
                            }
                    in
                    executeRec restToks nextStatus

                Nothing ->
                    haltWithError status ("セーブポイント (" ++ name ++ ") が見つかりません")

        _ ->
            haltWithError status "ロードする定数の名前を与えてください"


executePlaceRail : Rail () IsFlipped -> Int -> (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executePlaceRail railType rotation =
    let
        railPlaceFunc =
            RailPiece.placeRail railType rotation
    in
    \cont status ->
        case status.stack of
            [] ->
                haltWithError status "スタックが空です"

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
                        haltWithError status "配置するレールの凹凸が合いません"


executeAscend : Int -> (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeAscend amount cont status =
    case status.stack of
        [] ->
            haltWithError status "スタックが空です"

        top :: restOfStack ->
            cont { status | stack = RailLocation.addHeight amount top :: restOfStack }


executeInvert : (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeInvert cont status =
    case status.stack of
        [] ->
            haltWithError status "スタックが空です"

        top :: restOfStack ->
            cont { status | stack = RailLocation.invertJoint top :: restOfStack }
