module Util exposing (..)

import Dict exposing (Dict)
import List.Nonempty exposing (Nonempty(..))


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


{-| remove the first element from the list and append it to the end
-}
rotate : Nonempty a -> Nonempty a
rotate (Nonempty x xs) =
    case xs of
        [] ->
            Nonempty x xs

        y :: ys ->
            Nonempty y (ys ++ [ x ])


reverseTail : Nonempty a -> Nonempty a
reverseTail (Nonempty x xs) =
    Nonempty x (List.reverse xs)


loop : Int -> (a -> a) -> a -> a
loop n f a =
    if n <= 0 then
        a

    else
        loop (n - 1) f (f a)