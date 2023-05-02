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
import OBJ
import OBJ.Types exposing (MeshWith, Vertex)
import Rail exposing (Kind, allKinds)


type Msg
    = LoadMesh String (Result String (MeshWith Vertex))


type alias Model =
    { meshes : Dict String (MeshWith Vertex)
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
                    { model | meshes = Dict.insert name mesh model.meshes }


buildMeshUri : String -> String
buildMeshUri name =
    "http://localhost:8080/" ++ name ++ ".obj"


kindToObjName : Kind -> String
kindToObjName k =
    case k of
        Rail.Straight ->
            "straight_1"

        Rail.Curve ->
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


dummyMesh : MeshWith Vertex
dummyMesh =
    { vertices = [], indices = [] }


getMesh : Model -> Kind -> MeshWith Vertex
getMesh model kind =
    Maybe.withDefault dummyMesh <|
        Dict.get (kindToObjName kind) model.meshes


getErrors : Model -> List String
getErrors model =
    model.errors
