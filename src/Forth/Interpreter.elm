module Forth.Interpreter exposing (ExecResult, emptyResult, execute)

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

                "q" ->
                    executePlaceRail (executeRec ts) (Straight1 ()) 0 status

                "h" ->
                    executePlaceRail (executeRec ts) (Straight2 ()) 0 status

                "s" ->
                    executePlaceRail (executeRec ts) (Straight4 ()) 0 status

                "ss" ->
                    executePlaceRail (executeRec ts) (Straight8 ()) 0 status

                "l" ->
                    executePlaceRail (executeRec ts) (Curve45 () NotFlipped) 0 status

                "ll" ->
                    executePlaceRail (executeRec ts) (Curve90 () NotFlipped) 0 status

                "r" ->
                    executePlaceRail (executeRec ts) (Curve45 () Flipped) 0 status

                "rr" ->
                    executePlaceRail (executeRec ts) (Curve90 () Flipped) 0 status

                "tl" ->
                    executePlaceRail (executeRec ts) (Turnout () NotFlipped) 0 status

                "tl1" ->
                    executePlaceRail (executeRec ts) (Turnout () NotFlipped) 1 status

                "tl2" ->
                    executePlaceRail (executeRec ts) (Turnout () NotFlipped) 2 status

                "tr" ->
                    executePlaceRail (executeRec ts) (Turnout () Flipped) 0 status

                "dl" ->
                    executePlaceRail (executeRec ts) (SingleDouble () NotFlipped) 0 status

                "dr" ->
                    executePlaceRail (executeRec ts) (SingleDouble () Flipped) 0 status

                "j" ->
                    executePlaceRail (executeRec ts) (JointChange ()) 0 status

                "autoturnout" ->
                    executePlaceRail (executeRec ts) AutoTurnout 0 status

                "autopoint" ->
                    executePlaceRail (executeRec ts) AutoPoint 0 status

                "elevate" ->
                    executeElevate (executeRec ts) 4 status

                undefinedWord ->
                    haltWithError ("Undefined word: " ++ undefinedWord) status



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


executePlaceRail : (ExecStatus -> ExecResult) -> Rail () IsFlipped -> Int -> ExecStatus -> ExecResult
executePlaceRail cont railType rotation status =
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


executeElevate : (ExecStatus -> ExecResult) -> Int -> ExecStatus -> ExecResult
executeElevate cont amount status =
    case status.stack of
        [] ->
            haltWithError "Stack empty" status

        top :: restOfStack ->
            cont { status | stack = { top | height = top.height + amount } :: restOfStack }
