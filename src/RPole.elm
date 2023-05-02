module RPole exposing
    ( RPole
    , minus
    , plus
    , isMinus
    , isPlus
    , flip
    , mul
    )

type RPole
    = Minus
    | Plus


minus : RPole
minus =
    Minus

plus : RPole
plus =
    Plus

isMinus : RPole -> Bool
isMinus p =
    p == minus

isPlus : RPole -> Bool
isPlus p =
    p == plus

flip : RPole -> RPole
flip p =
    if isMinus p then
        plus
    else
        minus

mul : RPole -> RPole -> RPole
mul p q =
    if isPlus p then
        flip q
    else
        q

