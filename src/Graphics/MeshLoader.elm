module Graphics.MeshLoader exposing
    ( Mesh
    , Model
    , Msg
    , getErrors
    , getPierMesh
    , getRailMesh
    , init
    , loadMeshCmd
    , update
    )

import Dict exposing (Dict)
import Graphics.MeshWithScalingVector as SV
import Math.Vector3 as Vec3 exposing (Vec3)
import Types.Pier as Pier exposing (Pier)
import Types.Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
import WebGL


type alias Mesh =
    WebGL.Mesh SV.VertexWithScalingVector


type Msg
    = LoadMesh String (Result String SV.MeshAndFace)


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
                    { model | errors = Debug.log "load mesh error" e :: model.errors }

                Ok meshWith ->
                    let
                        glMesh =
                            WebGL.indexedTriangles meshWith.vertices meshWith.faces

                        flippedMeshWith =
                            flipMesh meshWith

                        flippedMesh =
                            WebGL.indexedTriangles flippedMeshWith.vertices flippedMeshWith.faces

                        updatedMeshes =
                            Dict.union model.meshes <|
                                Dict.fromList
                                    [ ( name, glMesh )
                                    , ( String.append name "_flip", flippedMesh )
                                    ]
                    in
                    { model | meshes = updatedMeshes }


{-| pass only safe constant strings
-}
buildMeshUri : String -> String
buildMeshUri name =
    "./assets/" ++ name ++ ".json"


{-| The list of mesh names. Used when loading .obj files
TODO: change the name of 3D models and these list of names.
since the definition of (Rail -> String) is moved to Rail module
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
    , "outercurve_minus"
    , "outercurve_plus"
    , "turnout_minus"
    , "turnout_plus"
    , "singledouble_minus"
    , "singledouble_plus"
    , "eight_minus"
    , "eight_plus"
    , "pole_minus"
    , "pole_plus"
    , "stop_minus"
    , "stop_plus"
    , "slope_minus"
    , "slope_plus"
    , "slopecurveA_plus"
    , "slopecurveB_minus"
    , "autoturnout_minus"
    , "autopoint_minus"
    , "pier"
    , "pier_wide"
    , "pier_4"
    ]


loadMeshCmd : (Msg -> msg) -> Cmd msg
loadMeshCmd f =
    Cmd.map f <|
        Cmd.batch <|
            List.map
                (\name ->
                    SV.load (buildMeshUri name) (LoadMesh name)
                )
                allMeshNames


dummyMesh : Mesh
dummyMesh =
    WebGL.triangles []


getRailMesh : Model -> Rail IsInverted IsFlipped -> Mesh
getRailMesh model rail =
    Dict.get (Types.Rail.toString rail) model.meshes
        |> Maybe.withDefault dummyMesh


getPierMesh : Model -> Pier -> Mesh
getPierMesh model pier =
    Dict.get (Pier.toString pier) model.meshes
        |> Maybe.withDefault dummyMesh


getErrors : Model -> List String
getErrors model =
    model.errors


flipMesh : SV.MeshAndFace -> SV.MeshAndFace
flipMesh mesh =
    { faces = mesh.faces
    , vertices = List.map flipVertex mesh.vertices
    }


flipVertex : SV.VertexWithScalingVector -> SV.VertexWithScalingVector
flipVertex vertex =
    { position = flipVec3 vertex.position
    , normal = flipVec3 vertex.normal
    , scalingVector = flipVec3 vertex.scalingVector
    }


flipVec3 : Vec3 -> Vec3
flipVec3 v =
    Vec3.vec3 (Vec3.getX v) (negate <| Vec3.getY v) (negate <| Vec3.getZ v)
