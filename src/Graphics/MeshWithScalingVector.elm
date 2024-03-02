module Graphics.MeshWithScalingVector exposing (MeshAndFace, VertexWithScalingVector, load, parse)

import Http
import Json.Decode as JD
import Math.Vector3 as Vec3 exposing (Vec3)


type alias VertexWithScalingVector =
    { position : Vec3
    , normal : Vec3
    , scalingVector : Vec3
    }


type alias MeshAndFace =
    { vertices : List VertexWithScalingVector
    , faces : List ( Int, Int, Int )
    }


decodeMeshWithScalingVector : JD.Decoder MeshAndFace
decodeMeshWithScalingVector =
    JD.map2 MeshAndFace
        (JD.field "vertices" <| JD.list vertex)
        (JD.field "faces" <| JD.list face)


vertex : JD.Decoder VertexWithScalingVector
vertex =
    JD.map3
        VertexWithScalingVector
        (list3 Vec3.vec3 JD.float)
        (list3 Vec3.vec3 JD.float)
        (list3 Vec3.vec3 JD.float)


face : JD.Decoder ( Int, Int, Int )
face =
    list3 (\a b c -> ( a, b, c )) JD.int


list3 : (a -> a -> a -> b) -> JD.Decoder a -> JD.Decoder b
list3 f decoder =
    JD.list decoder
        |> JD.andThen
            (\lis ->
                case lis of
                    [ x, y, z ] ->
                        JD.succeed <| f x y z

                    _ ->
                        JD.fail <| "list3: list count be 3 but got " ++ String.fromInt (List.length lis)
            )


parse : String -> Result String MeshAndFace
parse s =
    JD.decodeString decodeMeshWithScalingVector s
        |> Result.mapError (\_ -> "Parse Error")


load : String -> (Result String MeshAndFace -> msg) -> Cmd msg
load url msg =
    Http.send
        (\result ->
            result
                |> Result.mapError (\_ -> "HTTP Error")
                |> Result.andThen parse
                |> Result.mapError (\_ -> "Parse Error")
                |> msg
        )
        (Http.getString url)
