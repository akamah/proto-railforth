module Forth.Statistics exposing (..)

import Dict exposing (Dict)
import Rail exposing (IsFlipped(..), IsInverted, Rail(..))



-- このモジュールでは、レールの数などの統計情報を整形する。


getRailCount : List (Rail IsInverted IsFlipped) -> Dict String Int
getRailCount rails =
    List.foldl
        (\rail dict ->
            Dict.update (railToStringRegardlessOfFlipped rail)
                (\x ->
                    case x of
                        Nothing ->
                            Just 1

                        Just n ->
                            Just (n + 1)
                )
                dict
        )
        Dict.empty
        rails


railToStringRegardlessOfFlipped : Rail IsInverted a -> String
railToStringRegardlessOfFlipped rail =
    Rail.toStringWith (\_ -> "") Rail.isInvertedToString rail
