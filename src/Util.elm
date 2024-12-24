module Util exposing (..)

import Dict exposing (Dict)


foldlResult : (a -> b -> Result err b) -> b -> List a -> Result err b
foldlResult f b list =
    case list of
        [] ->
            Ok b

        x :: xs ->
            case f x b of
                Ok b2 ->
                    foldlResult f b2 xs

                Err err ->
                    Err err


updateWithResult : comparable -> (Maybe v -> Result e v) -> Dict comparable v -> Result e (Dict comparable v)
updateWithResult key f dict =
    f (Dict.get key dict)
        |> Result.map (\v -> Dict.insert key v dict)
