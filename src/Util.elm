module Util exposing (..)


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
