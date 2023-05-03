module RailPosition exposing (RailPosition, make)

import Math.Vector3 exposing (Vec3)
import Rail exposing (Rail)


{-| 一本のレールを配置するための型。
処理系の内部のデータ構造に依存せず、描画エンジンにぽっと渡せば描画できそうな情報を含ませる。
レールの種類、およびどこに置くべきかを保持する
-}
type alias RailPosition =
    { rail : Rail
    , origin : Vec3
    , angle : Float -- in radian
    }


make : Rail -> Vec3 -> Float -> RailPosition
make rail origin angle =
    { rail = rail
    , origin = origin
    , angle = angle
    }
