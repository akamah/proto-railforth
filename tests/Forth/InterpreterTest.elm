module Forth.InterpreterTest exposing (..)

import Expect exposing (..)
import Forth.Interpreter exposing (execute)
import Test exposing (..)


suite : Test
suite =
    describe "Interpreter module"
        [ test "define word" <|
            \_ ->
                Expect.equal
                    (execute ": foo l r s r l ; foo")
                    (execute "l r s r l")
        , test "comment" <|
            \_ ->
                Expect.equal
                    (execute "s s ( comment line ( dayo ) ) s s")
                    (execute "s s s s")
        , test "save and load" <|
            \_ ->
                Expect.equal
                    (execute "tr save foo s . load foo l .")
                    (execute "tr swap s . l .")
        ]
