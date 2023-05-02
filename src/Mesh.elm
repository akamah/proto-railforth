module Mesh exposing
    ( Model
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


type Msg
    = LoadMesh String (Result String (MeshWith Vertex))


type alias Model =
    { meshes : Dict String (WebGL.Mesh Vertex)
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

                Ok meshWith ->
                    let
                        mesh =
                            WebGL.indexedTriangles meshWith.vertices meshWith.indices
                    in
                    { model | meshes = Dict.insert name mesh model.meshes }


buildMeshUri : String -> String
buildMeshUri name =
    "http://localhost:8080/" ++ name ++ ".obj"


kindToObjName : Kind -> String
kindToObjName k =
    case k of
        Kind.Straight ->
            "straight_1"

        Kind.CurveRight ->
            "curve_8"

        Kind.CurveLeft ->
            "curve_8"


loadMeshCmd : (Msg -> msg) -> Cmd msg
loadMeshCmd f =
    Cmd.map f <|
        Cmd.batch <|
            List.map
                (\kind ->
                    let
                        name =
                            kindToObjName kind
                    in
                    OBJ.loadMeshWithoutTexture (buildMeshUri name) (LoadMesh name)
                )
                allKinds


dummyMesh : WebGL.Mesh Vertex
dummyMesh =
    WebGL.triangles []


getMesh : Model -> Kind -> WebGL.Mesh Vertex
getMesh model kind =
    Maybe.withDefault dummyMesh <|
        Dict.get (kindToObjName kind) model.meshes


getErrors : Model -> List String
getErrors model =
    model.errors
