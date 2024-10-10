module Types.RailPlacement exposing (RailPlacement, make)

import Math.Vector3 exposing (Vec3)
import Types.Rail exposing (IsFlipped, IsInverted, Rail)


{-| 一本のレールを配置するための型。
処理系の内部のデータ構造に依存せず、描画エンジンにぽっと渡せば描画できそうな情報を含ませる。
レールの種類、およびどこに置くべきかを保持する。
-}
type alias RailPlacement =
    { rail : Rail IsInverted IsFlipped

    -- 場所の単位は mm とする。理由としては、単線・複線レールなどが存在している都合上、
    -- レールの配置と言った情報は物理的なものであり、実際の大きさといった情報と不可分であることから、
    -- 描画エンジンではなくインタプリタの側に実際の大きさの知識をもたせたほうが自然だからである。
    -- 今後の進展次第で変化することは大いに有り得る。
    , position : Vec3
    , angle : Float -- in radian
    }


make : Rail IsInverted IsFlipped -> Vec3 -> Float -> RailPlacement
make rail position angle =
    { rail = rail
    , position = position
    , angle = angle
    }
