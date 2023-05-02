module Mesh exposing
    ( Mesh
    , Model
    , Msg
    , getErrors
    , getMesh
    , init
    , loadMeshCmd
    , update
    )

import Dict exposing (Dict)
import Kind exposing (Kind, allKinds)
import OBJ
import OBJ.Types exposing (MeshWith, Vertex)
import WebGL


type alias Mesh =
    { mesh : WebGL.Mesh Vertex
    , flipped : Bool
    }


type Msg
    = LoadMesh String Bool (Result String (MeshWith Vertex))


type alias Model =
    { meshes : Dict String Mesh
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
        LoadMesh name flipped meshOrErr ->
            case meshOrErr of
                Err e ->
                    { model | errors = e :: model.errors }

                Ok meshWith ->
                    let
                        glmesh =
                            WebGL.indexedTriangles meshWith.vertices meshWith.indices

                        mesh =
                            { mesh = glmesh
                            , flipped = flipped
                            }
                    in
                    { model | meshes = Dict.insert name mesh model.meshes }


buildMeshUri : Kind -> String
buildMeshUri kind =
    "http://localhost:8080/" ++ objNameOfKind kind ++ ".obj"


objNameOfKind : Kind -> String
objNameOfKind k =
    case k of
        Kind.Straight ->
            "straight_1"

        Kind.CurveRight ->
            "curve_8"

        Kind.CurveLeft ->
            "curve_8"


keyOfKind : Kind -> String
keyOfKind k =
    case k of
        Kind.Straight ->
            "Straight"

        Kind.CurveRight ->
            "CurveRight"

        Kind.CurveLeft ->
            "CurveLeft"


isFlipped : Kind -> Bool
isFlipped k =
    case k of
        Kind.Straight ->
            False

        Kind.CurveRight ->
            True

        Kind.CurveLeft ->
            False


loadMeshCmd : (Msg -> msg) -> Cmd msg
loadMeshCmd f =
    Cmd.map f <|
        Cmd.batch <|
            List.map
                (\kind ->
                    OBJ.loadMeshWithoutTexture (buildMeshUri kind) (LoadMesh (keyOfKind kind) (isFlipped kind))
                )
                allKinds


dummyMesh : Mesh
dummyMesh =
    { mesh = WebGL.triangles []
    , flipped = False
    }


getMesh : Model -> Kind -> Mesh
getMesh model kind =
    Maybe.withDefault dummyMesh <|
        Dict.get (keyOfKind kind) model.meshes


getErrors : Model -> List String
getErrors model =
    model.errors
