module Forth.Interpreter exposing (ExecResult, execute)

import Dict exposing (Dict)
import Forth.Geometry.PierLocation exposing (PierLocation)
import Forth.Geometry.RailLocation as RailLocation exposing (RailLocation)
import Forth.PierConstruction as PierConstruction
import Forth.RailPiece as RailPiece
import Forth.Statistics as Statistics
import PierPlacement exposing (PierPlacement)
import Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import RailPlacement exposing (RailPlacement)



-- -- インタープリタの定義


type alias ExecError =
    String


type alias ExecStatus =
    { stack : List RailLocation
    , rails : List RailPlacement
    , piers : List PierLocation
    }


type alias ExecResult =
    { rails : List RailPlacement
    , piers : List PierPlacement
    , errMsg : Maybe String
    , railCount : Dict String Int

    -- hukusen piers
    -- statistics :: count of rails...
    }


execute : String -> ExecResult
execute src =
    executeRec (tokenize src) initialStatus


tokenize : String -> List String
tokenize string =
    String.words string


initialStatus : ExecStatus
initialStatus =
    { stack = [ RailPiece.initialLocation ]
    , rails = []
    , piers = []
    }


coreGlossary : Dict String ((ExecStatus -> ExecResult) -> ExecStatus -> ExecResult)
coreGlossary =
    Dict.fromList
        [ ( "", identity {- do nothing -} )
        , ( ".", executeDrop )
        , ( "drop", executeDrop )
        , ( "swap", executeSwap )
        , ( "rot", executeRot )
        , ( "-rot", executeInverseRot )
        , ( "nip", executeNip )
        ]


controlWords : Dict String (List String -> ExecStatus -> ExecResult)
controlWords =
    Dict.fromList
        [ ( "(", executeComment 1 )
        , ( ")", \_ -> haltWithError "余分なコメント終了文字 ) があります" )
        ]


railForthGlossary : Dict String ((ExecStatus -> ExecResult) -> ExecStatus -> ExecResult)
railForthGlossary =
    Dict.fromList
        [ ( "q", executePlaceRail (Straight1 ()) 0 )
        , ( "h", executePlaceRail (Straight2 ()) 0 )
        , ( "s", executePlaceRail (Straight4 ()) 0 )
        , ( "ss", executePlaceRail (Straight8 ()) 0 )
        , ( "l", executePlaceRail (Curve45 NotFlipped ()) 0 )
        , ( "ll", executePlaceRail (Curve90 NotFlipped ()) 0 )
        , ( "r", executePlaceRail (Curve45 Flipped ()) 0 )
        , ( "rr", executePlaceRail (Curve90 Flipped ()) 0 )
        , ( "ol", executePlaceRail (OuterCurve45 NotFlipped ()) 0 )
        , ( "or", executePlaceRail (OuterCurve45 Flipped ()) 0 )
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
        , ( "stop", executePlaceRail (Stop ()) 0 )
        , ( "at", executePlaceRail AutoTurnout 0 )
        , ( "at1", executePlaceRail AutoTurnout 1 )
        , ( "at2", executePlaceRail AutoTurnout 2 )
        , ( "ap", executePlaceRail AutoPoint 0 )
        , ( "ap1", executePlaceRail AutoPoint 1 )
        , ( "ap2", executePlaceRail AutoPoint 2 )
        , ( "ap3", executePlaceRail AutoPoint 3 )
        , ( "ascend", executeAscend 4 )
        ]


executeRec : List String -> ExecStatus -> ExecResult
executeRec toks status =
    case toks of
        [] ->
            haltWithSuccess status

        t :: ts ->
            case Dict.get t controlWords of
                Just thread ->
                    thread ts status

                Nothing ->
                    case Dict.get t coreGlossary of
                        Just thread ->
                            thread (executeRec ts) status

                        Nothing ->
                            case Dict.get t railForthGlossary of
                                Just thread ->
                                    thread (executeRec ts) status

                                Nothing ->
                                    haltWithError ("未定義のワードです: " ++ t) status


{-| haltWithError
-}
haltWithError : ExecError -> ExecStatus -> ExecResult
haltWithError errMsg status =
    { rails = status.rails
    , errMsg = Just errMsg
    , railCount = Dict.empty
    , piers = []
    }


haltWithSuccess : ExecStatus -> ExecResult
haltWithSuccess status =
    case PierConstruction.toPierPlacement status.piers of
        Ok pierPlacement ->
            { rails = status.rails
            , errMsg = Nothing
            , railCount = Statistics.getRailCount <| List.map (\x -> x.rail) status.rails
            , piers = pierPlacement
            }

        Err err ->
            { rails = status.rails
            , errMsg = Just err
            , railCount = Statistics.getRailCount <| List.map (\x -> x.rail) status.rails
            , piers = []
            }


executeDrop : (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeDrop cont status =
    case status.stack of
        [] ->
            haltWithError "スタックが空です" status

        _ :: restOfStack ->
            cont { status | stack = restOfStack }


executeSwap : (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeSwap cont status =
    case status.stack of
        x :: y :: restOfStack ->
            cont { status | stack = y :: x :: restOfStack }

        _ ->
            haltWithError "スタックに最低2つの要素がある必要があります" status


executeRot : (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeRot cont status =
    case status.stack of
        x :: y :: z :: restOfStack ->
            cont { status | stack = z :: x :: y :: restOfStack }

        _ ->
            haltWithError "スタックに最低3つの要素がある必要があります" status


executeInverseRot : (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeInverseRot cont status =
    case status.stack of
        x :: y :: z :: restOfStack ->
            cont { status | stack = y :: z :: x :: restOfStack }

        _ ->
            haltWithError "スタックに最低3つの要素がある必要があります" status


executeNip : (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeNip cont status =
    case status.stack of
        x :: _ :: restOfStack ->
            cont { status | stack = x :: restOfStack }

        _ ->
            haltWithError "スタックに最低2つの要素がある必要があります" status


executeComment : Int -> List String -> ExecStatus -> ExecResult
executeComment depth tok status =
    if depth <= 0 then
        executeRec tok status

    else
        case tok of
            [] ->
                haltWithError "[コメント文]" status

            t :: ts ->
                case t of
                    "(" ->
                        executeComment (depth + 1) ts status

                    ")" ->
                        executeComment (depth - 1) ts status

                    _ ->
                        executeComment depth ts status


executePlaceRail : Rail () IsFlipped -> Int -> (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executePlaceRail railType rotation cont status =
    case status.stack of
        [] ->
            haltWithError "スタックが空です" status

        top :: restOfStack ->
            case RailPiece.placeRail { railType = railType, location = top, rotation = rotation } of
                Just { nextLocations, railPlacement, pierLocations } ->
                    cont
                        { status
                            | rails = railPlacement :: status.rails
                            , stack = nextLocations ++ restOfStack
                            , piers = pierLocations ++ status.piers
                        }

                Nothing ->
                    haltWithError "配置するレールの凹凸が合いません" status


executeAscend : Int -> (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeAscend amount cont status =
    case status.stack of
        [] ->
            haltWithError "スタックが空です" status

        top :: restOfStack ->
            cont { status | stack = RailLocation.addHeight amount top :: restOfStack }
