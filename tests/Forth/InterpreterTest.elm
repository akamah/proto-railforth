module Forth.InterpreterTest exposing (..)

import Expect exposing (..)
import Forth.Interpreter exposing (execute)
import Test exposing (..)


equal : List String -> List String -> Expectation
equal expected actual =
    Expect.equal
        (execute <| String.join "\n" expected)
        (execute <| String.join "\n" actual)


suite : Test
suite =
    describe "Interpreter module"
        [ test "define word" <|
            \_ ->
                equal [ "s s" ]
                    [ ": foo s s ; foo" ]
        , test "calling word inside other word def" <|
            \_ ->
                equal [ "l r l r" ]
                    [ ": foo l r ;"
                    , ": bar foo foo ;"
                    , "bar"
                    ]
        , test "define word inside word def" <|
            \_ ->
                equal [ "l r l r" ]
                    [ ": foo"
                    , "  : bar l r ;"
                    , "  bar bar"
                    , ";"
                    , "foo"
                    ]
        , test "save and load" <|
            \_ ->
                equal [ "tr swap s . l ." ]
                    [ "tr save foo s . load foo l ."
                    ]
        , test "word and variable" <|
            \_ ->
                equal [ "tr swap l r . s" ]
                    [ ": foo l r ;"
                    , "tr save hoge foo . load hoge s"
                    ]
        , test "comment" <|
            \_ ->
                equal [ "s s s s" ]
                    [ "s s ( comment line ( dayo ) ) s s" ]
        ]
