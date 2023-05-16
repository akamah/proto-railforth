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
    | Curve45 flip invert
    | Curve90 flip invert
    | OuterCurve45 flip invert
    | Turnout flip invert
    | SingleDouble flip invert
    | EightPoint flip invert
    | JointChange invert
    | Slope flip invert
    | SlopeCurveA
    | SlopeCurveB
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

        OuterCurve45 _ _ ->
            True

        Turnout _ _ ->
            True

        SingleDouble _ _ ->
            True

        EightPoint _ _ ->
            True

        JointChange _ ->
            True

        Slope _ _ ->
            True

        SlopeCurveA ->
            False

        SlopeCurveB ->
            False

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
            Curve45 a (f b)

        Curve90 a b ->
            Curve90 a (f b)

        OuterCurve45 a b ->
            OuterCurve45 a (f b)

        SingleDouble a b ->
            SingleDouble a (f b)

        EightPoint a b ->
            EightPoint a (f b)

        Turnout a b ->
            Turnout a (f b)

        JointChange a ->
            JointChange (f a)

        Slope a b ->
            Slope a (f b)

        SlopeCurveA ->
            SlopeCurveA

        SlopeCurveB ->
            SlopeCurveB

        Stop a ->
            Stop (f a)

        AutoTurnout ->
            AutoTurnout

        AutoPoint ->
            AutoPoint
