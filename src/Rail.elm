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
    = Straight1 invert
    | Straight2 invert
    | Straight4 invert
    | Straight8 invert
    | Curve45 invert flip
    | Curve90 invert flip
    | Turnout invert flip
    | SingleDouble invert flip
    | JointChange invert
    | Stop invert
    | AutoTurnout
    | AutoPoint


canInvert : Rail invert flip -> Bool
canInvert rail =
    case rail of
        Straight1 _ ->
            True

        Straight2 _ ->
            True

        Straight4 _ ->
            True

        Straight8 _ ->
            True

        Curve45 _ _ ->
            True

        Curve90 _ _ ->
            True

        Turnout _ _ ->
            True

        SingleDouble _ _ ->
            True

        JointChange _ ->
            True

        Stop _ ->
            True

        AutoTurnout ->
            False

        AutoPoint ->
            False


map : (a -> b) -> Rail a flip -> Rail b flip
map f rail =
    case rail of
        Straight1 a ->
            Straight1 (f a)

        Straight2 a ->
            Straight2 (f a)

        Straight4 a ->
            Straight4 (f a)

        Straight8 a ->
            Straight8 (f a)

        Curve45 a b ->
            Curve45 (f a) b

        Curve90 a b ->
            Curve90 (f a) b

        SingleDouble a b ->
            SingleDouble (f a) b

        Turnout a b ->
            Turnout (f a) b

        JointChange a ->
            JointChange (f a)

        Stop a ->
            Stop (f a)

        AutoTurnout ->
            AutoTurnout

        AutoPoint ->
            AutoPoint
