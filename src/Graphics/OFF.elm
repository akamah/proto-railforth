module Graphics.OFF exposing (parse)

import Math.Vector3 exposing (Vec3, vec3)
import String


type alias Mesh =
    { vertices : List Vec3
    , indices : List ( Int, Int, Int )
    }


parse : String -> Result Error Mesh
parse input =
    parseHeaderLine (String.lines input)
        |> Result.andThen
            (\( ( nv, nf, _ ), restHeader ) ->
                parseVertex nv restHeader
                    |> Result.andThen
                        (\( vertices, restVertices ) ->
                            parseFacet nf restVertices
                                |> Result.map
                                    (\( facets, _ ) ->
                                        { vertices = vertices, indices = facets }
                                    )
                        )
            )


type alias Error =
    String


parseHeaderLine : List String -> Result Error ( ( Int, Int, Int ), List String )
parseHeaderLine lines =
    case lines of
        [] ->
            Err "unexpected EOF"

        line :: rest ->
            case String.words line of
                [ "OFF", nv, nf, ne ] ->
                    Result.map (\vfe -> ( vfe, rest )) <|
                        Result.fromMaybe "the header contains non-integer values" <|
                            Maybe.map3 (\v f e -> ( v, f, e ))
                                (String.toInt nv)
                                (String.toInt nf)
                                (String.toInt ne)

                _ ->
                    Err "the header format is invalid"


parseVertex : Int -> List String -> Result Error ( List Vec3, List String )
parseVertex n lines =
    parseVertexHelper n [] lines


parseVertexHelper : Int -> List Vec3 -> List String -> Result Error ( List Vec3, List String )
parseVertexHelper n accum lines =
    if n <= 0 then
        Ok ( List.reverse accum, lines )

    else
        case parseVertexLine lines of
            Ok ( v, rest ) ->
                parseVertexHelper (n - 1) (v :: accum) rest

            Err msg ->
                Err msg


parseVertexLine : List String -> Result Error ( Vec3, List String )
parseVertexLine lines =
    case lines of
        [] ->
            Err "unexpected EOF"

        line :: rest ->
            case String.words line of
                sx :: sy :: sz :: _ ->
                    Result.map (\xyz -> ( xyz, rest )) <|
                        Result.fromMaybe "the vertex contains non-float values" <|
                            Maybe.map3 vec3
                                (String.toFloat sx)
                                (String.toFloat sy)
                                (String.toFloat sz)

                _ ->
                    Err "the vertex format is invalid"


parseFacet : Int -> List String -> Result Error ( List ( Int, Int, Int ), List String )
parseFacet n lines =
    parseFacetHelper n [] lines


parseFacetHelper : Int -> List ( Int, Int, Int ) -> List String -> Result Error ( List ( Int, Int, Int ), List String )
parseFacetHelper n accum lines =
    if n <= 0 then
        Ok ( List.reverse accum, lines )

    else
        case parseFacetLine lines of
            Ok ( v, rest ) ->
                parseFacetHelper (n - 1) (v :: accum) rest

            Err msg ->
                Err msg


parseFacetLine : List String -> Result Error ( ( Int, Int, Int ), List String )
parseFacetLine lines =
    case lines of
        [] ->
            Err "unexpected EOF"

        line :: rest ->
            case String.words line of
                "3" :: sa :: sb :: sc :: _ ->
                    Result.map (\xyz -> ( xyz, rest )) <|
                        Result.fromMaybe "the facet contains non-integer values" <|
                            Maybe.map3 (\a b c -> ( a, b, c ))
                                (String.toInt sa)
                                (String.toInt sb)
                                (String.toInt sc)

                _ ->
                    Err "the facet format is invalid"



-- loadMesh : (Result Http.Error Mesh -> msg) -> String -> Cmd msg
-- loadMesh msg url =
--     Http.send (\body -> msg (Result.map parse body)) (Http.getString url)
