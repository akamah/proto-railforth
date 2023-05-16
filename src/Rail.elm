module Rail exposing
    ( IsFlipped(..)
    , IsInverted(..)
    , Rail(..)
    , canInvert
    , map
    , toString
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

追記: 直線レールとか曲線レールとか、極性を入れ替えるのなら線路を裏返して逆向きにつないだりすればできるんですが、
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
    map (\_ -> True) rail /= map (\_ -> False) rail


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


toString : Rail IsInverted IsFlipped -> String
toString rail =
    case rail of
        Straight1 inv ->
            "straight4" ++ inverted inv

        Straight2 inv ->
            "straight2" ++ inverted inv

        Straight4 inv ->
            "straight1" ++ inverted inv

        Straight8 inv ->
            "straight0" ++ inverted inv

        Curve45 flip inv ->
            "curve8" ++ inverted inv ++ flipped flip

        Curve90 flip inv ->
            "curve4" ++ inverted inv ++ flipped flip

        OuterCurve45 flip inv ->
            "outercurve" ++ inverted inv ++ flipped flip

        Turnout flip inv ->
            "turnout" ++ inverted inv ++ flipped flip

        SingleDouble flip inv ->
            "singledouble" ++ inverted inv ++ flipped flip

        EightPoint flip inv ->
            "eight" ++ inverted inv ++ flipped flip

        JointChange inv ->
            "pole" ++ inverted inv

        Slope flip inv ->
            "slope" ++ inverted inv ++ flipped flip

        SlopeCurveA ->
            "slopecurveA_plus"

        SlopeCurveB ->
            "slopecurveB_minus"

        Stop inv ->
            "stop" ++ inverted inv

        AutoTurnout ->
            "autoturnout_minus"

        AutoPoint ->
            "autopoint_minus"


inverted : IsInverted -> String
inverted isInverted =
    case isInverted of
        NotInverted ->
            "_minus"

        Inverted ->
            "_plus"


flipped : IsFlipped -> String
flipped isFlipped =
    case isFlipped of
        NotFlipped ->
            ""

        Flipped ->
            "_flip"
