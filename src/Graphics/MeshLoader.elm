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

import Dict exposing (Dict)
import Graphics.OFF as OFF
import Graphics.Render as Render
import Math.Matrix4 exposing (Mat4)
import Math.Vector3 exposing (Vec3)
import Types.Pier as Pier exposing (Pier)
import Types.PierPlacement exposing (PierPlacement)
import Types.Rail exposing (IsFlipped(..), IsInverted(..), Rail(..))
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
                    { model | errors = Debug.log ("load mesh error: " ++ name) e :: model.errors }

                Ok mesh ->
                    let
                        glMesh =
                            WebGL.indexedTriangles (convertVertex mesh) mesh.indices

                        updatedMeshes =
                            Dict.union model.meshes <|
                                Dict.fromList
                                    [ ( name, glMesh )
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
                    OFF.load (buildMeshUri name) (LoadMesh name)
                )
                allMeshNames


dummyMesh : Mesh Render.Attributes
dummyMesh =
    WebGL.triangles []


getRailMesh : Model -> Rail IsInverted IsFlipped -> Mesh Render.Attributes
getRailMesh model rail =
    Dict.get (Types.Rail.toString rail) model.meshes
        |> Maybe.withDefault dummyMesh


getPierMesh : Model -> Pier -> Mesh Render.Attributes
getPierMesh model pier =
    Dict.get (Pier.toString pier) model.meshes
        |> Maybe.withDefault dummyMesh


renderRails : Model -> List RailPlacement -> Mat4 -> List Entity
renderRails model rails transform =
    List.concatMap
        (\railPosition ->
            Render.renderRail
                transform
                (getRailMesh model railPosition.rail)
                railPosition.position
                railPosition.angle
        )
        rails


renderPiers : Model -> List PierPlacement -> Mat4 -> List Entity
renderPiers model piers transform =
    List.map
        (\pierPlacement ->
            Render.renderPier
                transform
                (getPierMesh model pierPlacement.pier)
                pierPlacement.position
                pierPlacement.angle
        )
        piers


getErrors : Model -> List String
getErrors model =
    model.errors


convertVertex : OFF.Mesh -> List Attributes
convertVertex { vertices, indices } =
    let
        -- dummy!
        calcNormal v =
            v
    in
    List.map (\v -> { position = v, normal = calcNormal v }) vertices
