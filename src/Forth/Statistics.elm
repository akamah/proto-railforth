module Forth.Statistics exposing (getPierCount, getRailCount)

import Dict exposing (Dict)
import Types.Pier as Pier exposing (Pier)
import Types.Rail exposing (IsFlipped(..), IsInverted, Rail(..))



-- このモジュールでは、レールの数などの統計情報を整形する。


getRailCount : List (Rail IsInverted IsFlipped) -> Dict String Int
getRailCount rails =
    List.foldl
        (\rail ->
            Dict.update rail
                (\x ->
                    case x of
                        Nothing ->
                            Just 1

                        Just n ->
                            Just (n + 1)
                )
        )
        Dict.empty
        (List.map railToStringRegardlessOfFlipped rails)


railToStringRegardlessOfFlipped : Rail IsInverted a -> String
railToStringRegardlessOfFlipped rail =
    Types.Rail.toStringWith (\_ -> "") Types.Rail.isInvertedToString rail


getPierCount : List Pier -> Dict String Int
getPierCount piers =
    List.foldl
        (\pier ->
            Dict.update pier
                (\x ->
                    case x of
                        Nothing ->
                            Just 1

                        Just n ->
                            Just (n + 1)
                )
        )
        Dict.empty
        (List.map Pier.toString piers)
