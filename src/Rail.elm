module Rail exposing
    ( IsFlipped(..)
    , IsInverted(..)
    , Rail(..)
    , canInvert
    , map
    )


type IsInverted
    = NotInverted
    | Inverted


type IsFlipped
    = NotFlipped
    | Flipped


{-| レールの種類を表す型。

invertは、そのレールの端点の凹凸を逆にすることができるかを、
flip はそのレールを裏返す事ができるかを持つ。
逆に、そういったことにこだわらない場合はこれらの型パラメータに()を渡すことができる。

invertやflipについて、そういった操作ができないようなレールについてはそもそもそういうのを持たせない設計

追記: 直線レールとか曲線レールとか、極性を入れ替えるのなら線路を裏返したり逆向きにつないだりすればできるんですが、
座標の計算がマジでめんどくさいのでやめた。

-}
type Rail invert flip
    = Straight invert
    | Curve invert flip
    | Turnout invert flip
    | AutoTurnout


canInvert : Rail invert flip -> Bool
canInvert rail =
    case rail of
        Straight _ ->
            True

        Curve _ _ ->
            True

        Turnout _ _ ->
            True

        AutoTurnout ->
            False


map : (a -> b) -> Rail a flip -> Rail b flip
map f rail =
    case rail of
        Straight a ->
            Straight (f a)

        Curve a b ->
            Curve (f a) b

        Turnout a b ->
            Turnout (f a) b

        AutoTurnout ->
            AutoTurnout
