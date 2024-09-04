module Graphics.OFF exposing (Mesh, load, parse)

import Http
import Math.Vector3 exposing (Vec3, vec3)
import Parser exposing ((|.), (|=), Parser)
import String


type alias Mesh =
    { vertices : List Vec3
    , indices : List ( Int, Int, Int )
    }


load : String -> (Result String Mesh -> msg) -> Cmd msg
load url msg =
    Http.send
        (\result ->
            result
                |> Result.mapError (\_ -> "HTTP Error")
                |> Result.andThen parse
                |> msg
        )
        (Http.getString url)


parse : String -> Result String Mesh
parse input =
    Parser.run parser input
        |> Result.mapError
            (List.map
                (\deadend ->
                    "dead end at (line, col) = ("
                        ++ String.fromInt deadend.row
                        ++ ", "
                        ++ String.fromInt deadend.col
                        ++ ")"
                )
                >> String.join "\n"
            )


parser : Parser Mesh
parser =
    header
        |> Parser.andThen
            (\( nv, nf, _ ) ->
                Parser.succeed (\vs fs -> { vertices = vs, indices = fs })
                    |= vertices nv
                    |= facets nf
            )


header : Parser ( Int, Int, Int )
header =
    Parser.succeed (\nv nf ne -> ( nv, nf, ne ))
        |. Parser.keyword "OFF"
        |. Parser.spaces
        |= Parser.int
        |. Parser.spaces
        |= Parser.int
        |. Parser.spaces
        |= Parser.int
        |. Parser.spaces


vertices : Int -> Parser (List Vec3)
vertices n =
    replicate n vertexLine


vertexLine : Parser Vec3
vertexLine =
    Parser.succeed vec3
        |= float
        |. whitespaces
        |= float
        |. whitespaces
        |= float
        |. Parser.spaces


facets : Int -> Parser (List ( Int, Int, Int ))
facets n =
    Parser.map List.concat <| replicate n facetLine


facetLine : Parser (List ( Int, Int, Int ))
facetLine =
    Parser.int
        |> Parser.andThen
            (\count ->
                case count of
                    3 ->
                        Parser.succeed (\a b c -> [ ( a, b, c ) ])
                            |. whitespaces
                            |= Parser.int
                            |. whitespaces
                            |= Parser.int
                            |. whitespaces
                            |= Parser.int
                            |. Parser.spaces

                    4 ->
                        Parser.succeed (\a b c d -> [ ( a, b, c ), ( a, c, d ) ])
                            |. whitespaces
                            |= Parser.int
                            |. whitespaces
                            |= Parser.int
                            |. whitespaces
                            |= Parser.int
                            |. Parser.spaces
                            |= Parser.int
                            |. Parser.spaces

                    _ ->
                        Parser.problem <| "required 3 or 4 but got " ++ String.fromInt count
            )


float : Parser Float
float =
    Parser.oneOf
        [ Parser.succeed negate
            |. Parser.symbol "-"
            |= Parser.float
        , Parser.float
        ]


replicate : Int -> Parser a -> Parser (List a)
replicate n p =
    Parser.loop ( 0, [] )
        (\( i, revAccum ) ->
            if i < n then
                Parser.map (\a -> Parser.Loop ( i + 1, a :: revAccum )) p

            else
                Parser.succeed (Parser.Done (List.reverse revAccum))
        )


whitespaces : Parser ()
whitespaces =
    Parser.chompWhile (\c -> c == ' ' || c == '\t')
