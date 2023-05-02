module Graphics.Mesh exposing
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
import Math.Vector3 as Vec3 exposing (Vec3)
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
    , "turnout_L"
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

        Turnout ->
            -- Stub
            "turnout_L"


getMesh : Model -> Placement -> Mesh
getMesh model placement =
    Dict.get (getMeshName placement.shape) model.meshes
        |> Maybe.withDefault dummyMesh


getErrors : Model -> List String
getErrors model =
    model.errors


{- Internal. flip mesh to flip a rail

flipMesh : MeshWith Vertex -> MeshWith Vertex
flipMesh meshWith =
    { indices = meshWith.indices
    , vertices = List.map flipVertex meshWith.vertices
    }
-}


flipVertex : Vertex -> Vertex
flipVertex vertex =
    { position = flipVec3 vertex.position
    , normal = flipVec3 vertex.normal
    }


flipVec3 : Vec3 -> Vec3
flipVec3 v =
    Vec3.vec3 (Vec3.getX v) (negate <| Vec3.getY v) (negate <| Vec3.getZ v)
