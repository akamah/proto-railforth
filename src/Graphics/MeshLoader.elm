module Graphics.MeshLoader exposing
    ( Model
    , Msg
    , getErrors
    , init
    , loadMeshCmd
    , renderPiers
    , renderRails
    , update
    )

import Array
import Dict exposing (Dict)
import Graphics.OFF as OFF
import Graphics.Render as Render
import Math.Matrix4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Types.Pier as Pier exposing (Pier)
import Types.PierPlacement exposing (PierPlacement)
import Types.Rail as Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import Types.RailPlacement exposing (RailPlacement)
import WebGL exposing (Entity, Mesh)


type alias Attributes =
    { position : Vec3
    , normal : Vec3
    }


type Msg
    = LoadMesh String (Result String OFF.Mesh)


type alias Model =
    { meshes : Dict String (Mesh Render.Attributes)
    , errors : List String
    }


init : Model
init =
    { meshes = Dict.empty
    , errors = []
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        LoadMesh name meshOrErr ->
            case meshOrErr of
                Err e ->
                    { model | errors = e :: model.errors }

                Ok mesh ->
                    case convertMesh mesh of
                        Err e ->
                            { model | errors = e :: model.errors }

                        Ok vertices ->
                            let
                                updatedMeshes =
                                    Dict.union model.meshes <|
                                        Dict.fromList
                                            [ ( name, WebGL.triangles vertices )
                                            ]
                            in
                            { model | meshes = updatedMeshes }


{-| pass only safe constant strings
-}
buildMeshUri : String -> String
buildMeshUri name =
    "./assets/" ++ name ++ ".off"


{-| The list of mesh names. Used when loading .obj files
TODO: change the name of 3D models and these list of names.
since the definition of (Rail -> String) is moved to Rail module
-}
allMeshNames : List String
allMeshNames =
    List.map Rail.toString Rail.allRails ++ List.map Pier.toString Pier.allPiers


loadMeshCmd : (Msg -> msg) -> Cmd msg
loadMeshCmd f =
    Cmd.map f <|
        Cmd.batch <|
            List.map
                (\name ->
                    OFF.load (buildMeshUri name) (LoadMesh name)
                )
                allMeshNames


dummyMesh : Mesh Render.Attributes
dummyMesh =
    WebGL.triangles []


getRailMesh : Model -> Rail IsInverted IsFlipped -> Mesh Render.Attributes
getRailMesh model rail =
    Dict.get (Rail.toString rail) model.meshes
        |> Maybe.withDefault dummyMesh


getPierMesh : Model -> Pier -> Mesh Render.Attributes
getPierMesh model pier =
    Dict.get (Pier.toString pier) model.meshes
        |> Maybe.withDefault dummyMesh


renderRails : Model -> List RailPlacement -> Mat4 -> Mat4 -> List Entity
renderRails model rails viewMatrix projectionMatrix =
    List.concatMap
        (\railPosition ->
            Render.renderRail
                viewMatrix
                projectionMatrix
                (getRailMesh model railPosition.rail)
                railPosition.position
                railPosition.angle
                (getRailColor railPosition.rail)
        )
        rails


getRailColor : Rail a b -> Vec3
getRailColor rail =
    let
        blue =
            vec3 0.12 0.56 1.0

        red =
            vec3 1.0 0.2 0.4

        gray =
            vec3 0.8 0.8 0.8

        green =
            vec3 0.12 1.0 0.56

        skyblue =
            vec3 0.47 0.8 1.0
    in
    case rail of
        UTurn ->
            red

        Oneway _ ->
            gray

        WideCross ->
            gray

        Forward _ ->
            green

        Backward _ ->
            skyblue

        _ ->
            blue


renderPiers : Model -> List PierPlacement -> Mat4 -> Mat4 -> List Entity
renderPiers model piers viewMatrix projectionMatrix =
    List.concatMap
        (\pierPlacement ->
            Render.renderPier
                viewMatrix
                projectionMatrix
                (getPierMesh model pierPlacement.pier)
                pierPlacement.position
                pierPlacement.angle
        )
        piers


getErrors : Model -> List String
getErrors model =
    model.errors


sequence : List (Result a b) -> Result a (List b)
sequence list =
    let
        rec ls accum =
            case ls of
                [] ->
                    Ok (List.reverse accum)

                x :: xs ->
                    x |> Result.andThen (\x1 -> rec xs (x1 :: accum))
    in
    rec list []


{-| OFFパーサの結果には法線ベクトルが含まれていないので付与する
-}
convertMesh : OFF.Mesh -> Result String (List ( Attributes, Attributes, Attributes ))
convertMesh { vertices, indices } =
    let
        -- O(1) for getting i-th element of vertices
        verticesArray =
            Array.fromList vertices

        calcNormal v0 v1 v2 =
            Vec3.normalize (Vec3.cross (Vec3.sub v1 v0) (Vec3.sub v2 v0))

        calcTriangle ( a, b, c ) =
            let
                errMsg =
                    "invalid face: (" ++ String.join ", " (List.map String.fromInt [ a, b, c ]) ++ ")"
            in
            Maybe.map3
                (\x y z ->
                    let
                        normal =
                            calcNormal x y z
                    in
                    ( { position = x, normal = normal }
                    , { position = y, normal = normal }
                    , { position = z, normal = normal }
                    )
                )
                (Array.get a verticesArray)
                (Array.get b verticesArray)
                (Array.get c verticesArray)
                |> Result.fromMaybe errMsg
    in
    List.map calcTriangle indices
        |> sequence
