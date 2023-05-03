module Forth.Geometry.Flip exposing (dummy)

{-| レールについて、反転しているかどうかを表す。
-}


dummy : String
dummy =
    "hoge"


type Flip
    = Flip Bool


yes : Flip
yes =
    Flip True


no : Flip
no =
    Flip False


isFlipped : Flip -> Bool
isFlipped f =
    case f of
        Flip boolean ->
            boolean


toString : Flip -> String
toString f =
    if isFlipped f then
        "Flip@yes"

    else
        "Flip@no"
