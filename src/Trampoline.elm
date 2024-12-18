module Trampoline exposing (..)

{-| inspired by <https://eed3si9n.com/herding-cats/ja/stackless-scala-with-free-monads.html>
-}


type Trampoline e a
    = More (() -> Trampoline e a)
    | Done a
    | Failure e


andThen : (a -> Trampoline e b) -> Trampoline e a -> Trampoline e b
andThen f a =
    case a of
        More m ->
            More (m >> andThen f)

        Done b ->
            f b

        Failure e ->
            Failure e


compose : (a -> Trampoline e b) -> (b -> Trampoline e c) -> (a -> Trampoline e c)
compose f g a =
    f a |> andThen g


sequence : List (a -> Trampoline e a) -> a -> Trampoline e a
sequence fs =
    List.foldr compose Done fs


run : Trampoline e a -> Result e a
run t =
    case t of
        Done a ->
            Ok a

        Failure e ->
            Err e

        More m ->
            run (m ())
