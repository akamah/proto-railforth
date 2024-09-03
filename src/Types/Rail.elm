module Types.Rail exposing
    ( IsFlipped(..)
    , IsInverted(..)
    , Rail(..)
    , allRails
    , canInvert
    , isFlippedToString
    , isInvertedToString
    , map
    , toString
    , toStringWith
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
    map (always True) rail /= map (always False) rail


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
toString =
    toStringWith isFlippedToString isInvertedToString


toStringWith : (flipped -> String) -> (inverted -> String) -> Rail inverted flipped -> String
toStringWith flipped inverted rail =
    case rail of
        Straight1 inv ->
            "straight1" ++ inverted inv

        Straight2 inv ->
            "straight2" ++ inverted inv

        Straight4 inv ->
            "straight4" ++ inverted inv

        Straight8 inv ->
            "straight8" ++ inverted inv

        Curve45 flip inv ->
            "curve45" ++ inverted inv ++ flipped flip

        Curve90 flip inv ->
            "curve90" ++ inverted inv ++ flipped flip

        OuterCurve45 flip inv ->
            "outer_curve45" ++ inverted inv ++ flipped flip

        Turnout flip inv ->
            "turnout" ++ inverted inv ++ flipped flip

        SingleDouble flip inv ->
            "single_double" ++ inverted inv ++ flipped flip

        EightPoint flip inv ->
            "eight" ++ inverted inv ++ flipped flip

        JointChange inv ->
            "joint" ++ inverted inv

        Slope flip inv ->
            "slope" ++ inverted inv ++ flipped flip

        SlopeCurveA ->
            "slopecurveA_plus"

        SlopeCurveB ->
            "slopecurveB_minus"

        Stop inv ->
            "stop" ++ inverted inv

        AutoTurnout ->
            "auto_turnout_minus"

        AutoPoint ->
            "auto_point_minus"


isInvertedToString : IsInverted -> String
isInvertedToString isInverted =
    case isInverted of
        NotInverted ->
            "_minus"

        Inverted ->
            "_plus"


isFlippedToString : IsFlipped -> String
isFlippedToString isFlipped =
    case isFlipped of
        NotFlipped ->
            ""

        Flipped ->
            "_flip"


allRails : List (Rail IsInverted IsFlipped)
allRails =
    [ SlopeCurveA
    , SlopeCurveB
    , AutoTurnout
    , AutoPoint
    ]
        ++ ([ Inverted, NotInverted ]
                |> List.concatMap
                    (\invert ->
                        [ Straight1 invert
                        , Straight2 invert
                        , Straight4 invert
                        , Straight8 invert
                        , JointChange invert
                        , Stop invert
                        ]
                    )
           )
        ++ ([ Inverted, NotInverted ]
                |> List.concatMap
                    (\invert ->
                        [ Flipped, NotFlipped ]
                            |> List.concatMap
                                (\flip ->
                                    [ Curve45 flip invert
                                    , Curve90 flip invert
                                    , OuterCurve45 flip invert
                                    , Turnout flip invert
                                    , SingleDouble flip invert
                                    , EightPoint flip invert
                                    , Slope flip invert
                                    ]
                                )
                    )
           )
