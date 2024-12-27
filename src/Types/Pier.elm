module Types.Pier exposing
    ( Pier(..)
    , allPiers
    , compare
    , getHeight
    , toString
    )

{- 後から追加されるレールによって橋脚が単線から複線になったりすることも考えられるため、オンライン処理は諦めて最後に一括で行うことにした。 | -}


type Pier
    = Single
    | Wide
    | Mini


toString : Pier -> String
toString pier =
    case pier of
        Single ->
            "pier_single"

        Wide ->
            "pier_double"

        Mini ->
            "pier_mini"


getHeight : Pier -> Int
getHeight pier =
    case pier of
        Single ->
            4

        Wide ->
            4

        Mini ->
            1


allPiers : List Pier
allPiers =
    [ Single, Wide, Mini ]


compare : Pier -> Pier -> Order
compare a b =
    let
        f x =
            case x of
                Single ->
                    0

                Wide ->
                    1

                Mini ->
                    2
    in
    Basics.compare (f a) (f b)
