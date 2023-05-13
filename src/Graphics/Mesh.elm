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
    [ "straight0_minus"
    , "straight0_plus"
    , "straight1_minus"
    , "straight1_plus"
    , "straight2_minus"
    , "straight2_plus"
    , "straight4_minus"
    , "straight4_plus"
    , "curve8_minus"
    , "curve8_plus"
    , "curve4_minus"
    , "curve4_plus"
    , "turnout_minus"
    , "turnout_plus"
    , "singledouble_minus"
    , "singledouble_plus"
    , "pole_minus"
    , "pole_plus"
    , "autoturnout_minus"
    , "autopoint_minus"
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


inverted : IsInverted -> String
inverted isInverted =
    case isInverted of
        NotInverted ->
            "_minus"

        Inverted ->
            "_plus"


flipped : IsFlipped -> String
flipped isFlipped =
    case isFlipped of
        NotFlipped ->
            ""

        Flipped ->
            "_flip"


getMeshName : Rail IsInverted IsFlipped -> String
getMeshName rail =
    case rail of
        Straight1 inv ->
            "straight4" ++ inverted inv

        Straight2 inv ->
            "straight2" ++ inverted inv

        Straight4 inv ->
            "straight1" ++ inverted inv

        Straight8 inv ->
            "straight0" ++ inverted inv

        Curve45 inv flip ->
            "curve8" ++ inverted inv ++ flipped flip

        Curve90 inv flip ->
            "curve4" ++ inverted inv ++ flipped flip

        Turnout inv flip ->
            "turnout" ++ inverted inv ++ flipped flip

        SingleDouble inv flip ->
            "singledouble" ++ inverted inv ++ flipped flip

        JointChange inv ->
            "pole" ++ inverted inv

        AutoTurnout ->
            "autoturnout_minus"

        AutoPoint ->
            "autopoint_minus"


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
