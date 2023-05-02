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
import Flip exposing (Flip)
import OBJ
import OBJ.Types exposing (MeshWith, Vertex)
import Placement exposing (Placement)
import Shape exposing (Shape(..))
import WebGL


type alias Mesh =
    WebGL.Mesh Vertex


type Msg
    = LoadMesh String (Result String (MeshWith Vertex))


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


{-| pass only safe constant strings
-}
buildMeshUri : String -> String
buildMeshUri name =
    "http://localhost:8080/" ++ name ++ ".obj"


allMeshNames : List String
allMeshNames =
    [ "straight_1"
    , "curve_8"
    ]


loadMeshCmd : (Msg -> msg) -> Cmd msg
loadMeshCmd f =
    Cmd.map f <|
        Cmd.batch <|
            List.map
                (\name ->
                    OBJ.loadMeshWithoutTexture (buildMeshUri name) (LoadMesh name)
                )
                allMeshNames


dummyMesh : Mesh
dummyMesh =
    WebGL.triangles []


getMeshName : Shape -> String
getMeshName shape =
    case shape of
        Straight ->
            "straight_1"

        Curve ->
            "curve_8"


getMesh : Model -> Placement -> Mesh
getMesh model placement =
    Maybe.withDefault dummyMesh <|
        Dict.get (getMeshName placement.shape) model.meshes


getErrors : Model -> List String
getErrors model =
    model.errors
