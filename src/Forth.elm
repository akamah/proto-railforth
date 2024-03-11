module Forth exposing (Result, execute)

{-| This is a facade module of Forth interpreter.
-}

import Forth.Interpreter


type alias Result =
    Forth.Interpreter.ExecResult


execute : String -> Result
execute =
    Forth.Interpreter.execute
