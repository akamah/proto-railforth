module Forth.Interpreter exposing (ExecResult, emptyResult, execute)

import Dict exposing (Dict)
import Forth.Geometry.Location exposing (Location)
import Forth.RailPiece as RailPiece
import Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import RailPlacement exposing (RailPlacement)



-- -- インタープリタの定義


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
    { stack = [ RailPiece.initialLocation ]
    , rails = []
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
        ]


controlWords : Dict String (List String -> ExecStatus -> ExecResult)
controlWords =
    Dict.fromList
        [ ( "(", executeComment 1 )
        , ( ")", \_ -> haltWithError "extra end comment ) found" )
        ]


railForthGlossary : Dict String ((ExecStatus -> ExecResult) -> ExecStatus -> ExecResult)
railForthGlossary =
    Dict.fromList
        [ ( "q", executePlaceRail (Straight1 ()) 0 )
        , ( "h", executePlaceRail (Straight2 ()) 0 )
        , ( "s", executePlaceRail (Straight4 ()) 0 )
        , ( "ss", executePlaceRail (Straight8 ()) 0 )
        , ( "l", executePlaceRail (Curve45 () NotFlipped) 0 )
        , ( "ll", executePlaceRail (Curve90 () NotFlipped) 0 )
        , ( "r", executePlaceRail (Curve45 () Flipped) 0 )
        , ( "rr", executePlaceRail (Curve90 () Flipped) 0 )
        , ( "ol", executePlaceRail (OuterCurve45 () NotFlipped) 0 )
        , ( "or", executePlaceRail (OuterCurve45 () Flipped) 0 )
        , ( "tl", executePlaceRail (Turnout () NotFlipped) 0 )
        , ( "tl1", executePlaceRail (Turnout () NotFlipped) 1 )
        , ( "tl2", executePlaceRail (Turnout () NotFlipped) 2 )
        , ( "tr", executePlaceRail (Turnout () Flipped) 0 )
        , ( "tr1", executePlaceRail (Turnout () Flipped) 1 )
        , ( "tr2", executePlaceRail (Turnout () Flipped) 2 )
        , ( "dl", executePlaceRail (SingleDouble () NotFlipped) 0 )
        , ( "dl1", executePlaceRail (SingleDouble () NotFlipped) 1 )
        , ( "dl2", executePlaceRail (SingleDouble () NotFlipped) 2 )
        , ( "dr", executePlaceRail (SingleDouble () Flipped) 0 )
        , ( "dr1", executePlaceRail (SingleDouble () Flipped) 1 )
        , ( "dr2", executePlaceRail (SingleDouble () Flipped) 2 )
        , ( "el", executePlaceRail (EightPoint () NotFlipped) 0 )
        , ( "el1", executePlaceRail (EightPoint () NotFlipped) 1 )
        , ( "el2", executePlaceRail (EightPoint () NotFlipped) 2 )
        , ( "er", executePlaceRail (EightPoint () Flipped) 0 )
        , ( "er1", executePlaceRail (EightPoint () Flipped) 1 )
        , ( "er2", executePlaceRail (EightPoint () Flipped) 2 )
        , ( "j", executePlaceRail (JointChange ()) 0 )
        , ( "up", executePlaceRail (Slope () NotFlipped) 0 )
        , ( "dn", executePlaceRail (Slope () Flipped) 0 )
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
        , ( "elevate", executeElevate 4 )
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
                                    haltWithError ("Undefined word: " ++ t) status


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


executePlaceRail : Rail () IsFlipped -> Int -> (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executePlaceRail railType rotation cont status =
    case status.stack of
        [] ->
            haltWithError "Stack empty" status

        top :: restOfStack ->
            case RailPiece.placeRail { railType = railType, location = top, rotation = rotation } of
                Just { nextLocations, railPlacement } ->
                    cont
                        { status
                            | rails = railPlacement :: status.rails
                            , stack = nextLocations ++ restOfStack
                        }

                Nothing ->
                    haltWithError "Joint mismatch" status


executeElevate : Int -> (ExecStatus -> ExecResult) -> ExecStatus -> ExecResult
executeElevate amount cont status =
    case status.stack of
        [] ->
            haltWithError "Stack empty" status

        top :: restOfStack ->
            cont { status | stack = { top | height = top.height + amount } :: restOfStack }
