module Rail exposing
    ( IsFlipped(..)
    , IsInverted(..)
    , Rail(..)
    )


type IsInverted
    = Inverted
    | NotInverted


type IsFlipped
    = Flipped
    | NotFlipped


{-| レールの種類を表す型。

invertは、そのレールの端点の凹凸を逆にすることができるかを、
flip はそのレールを裏返す事ができるかを持つ。
逆に、そういったことにこだわらない場合はこれらの型パラメータに()を渡すことができる。

invertやflipについて、そういった操作ができないようなレールについてはそもそもそういうのを持たせない設計

-}
type Rail invert flip
    = Straight
    | Curve flip
    | Turnout invert flip
