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
import Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import RailPlacement exposing (RailPlacement)
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

                        flippedMeshWith =
                            flipMesh meshWith

                        flippedMesh =
                            WebGL.indexedTriangles flippedMeshWith.vertices flippedMeshWith.indices

                        updatedMeshes =
                            Dict.union model.meshes <|
                                Dict.fromList
                                    [ ( name, mesh )
                                    , ( String.append name "_flip", flippedMesh )
                                    ]
                    in
                    { model | meshes = updatedMeshes }


{-| pass only safe constant strings
-}
buildMeshUri : String -> String
buildMeshUri name =
    "http://localhost:8080/" ++ name ++ ".obj"


{-| The list of mesh names. Used when loading .obj files
-}
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


getMeshName : Rail IsInverted IsFlipped -> String
getMeshName rail =
    case rail of
        Straight ->
            "straight_1"

        Curve NotFlipped ->
            -- Stub
            "curve_8"

        Curve Flipped ->
            "curve_8_flip"

        Turnout NotInverted NotFlipped ->
            -- STUB!
            "turnout_L"

        Turnout NotInverted Flipped ->
            -- STUB!
            "turnout_L_flip"

        Turnout Inverted NotFlipped ->
            -- STUB!
            "turnout_R"

        Turnout Inverted Flipped ->
            -- STUB!
            "turnout_R_flip"


getMesh : Model -> RailPlacement -> Mesh
getMesh model placement =
    Dict.get (getMeshName placement.rail) model.meshes
        |> Maybe.withDefault dummyMesh


getErrors : Model -> List String
getErrors model =
    model.errors


flipMesh : MeshWith Vertex -> MeshWith Vertex
flipMesh meshWith =
    { indices = meshWith.indices
    , vertices = List.map flipVertex meshWith.vertices
    }


flipVertex : Vertex -> Vertex
flipVertex vertex =
    { position = flipVec3 vertex.position
    , normal = flipVec3 vertex.normal
    }


flipVec3 : Vec3 -> Vec3
flipVec3 v =
    Vec3.vec3 (Vec3.getX v) (negate <| Vec3.getY v) (negate <| Vec3.getZ v)
