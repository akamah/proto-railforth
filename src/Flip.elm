module Flip exposing
    ( Flip
    , no
    , yes
    )

{-| レールについて、反転しているかどうかを表す。
-}


type alias Flip =
    Bool


yes : Flip
yes =
    True


no : Flip
no =
    False
