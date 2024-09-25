module Graphics.OrbitControlImpl exposing
    ( Model
    , doPanning
    , doRotation
    , doScaleAdd
    , doScaleMult
    , init
    , makeProjectionMatrix
    , makeViewMatrix
    , updateViewport
    )

{-| The simple orbit control
This module implements rotation, pan, and dolly operation.
All other things like an event handling are user's responsibility.
-}

import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)


type Model
    = Model ModelImpl


type alias ModelImpl =
    { viewportWidth : Float
    , viewportHeight : Float
    , azimuth : Float
    , altitude : Float
    , scale : Float
    , target : Vec3
    }


init : Float -> Float -> Float -> Vec3 -> Model
init azimuth altitude scale eyeTarget =
    Model
        { viewportWidth = 0
        , viewportHeight = 0
        , azimuth = azimuth
        , altitude = altitude
        , scale = scale
        , target = eyeTarget
        }


updateViewport : Model -> Float -> Float -> Model
updateViewport (Model model) w h =
    Model { model | viewportWidth = w, viewportHeight = h }


makeProjectionMatrix : Model -> Mat4
makeProjectionMatrix (Model model) =
    let
        w =
            model.scale * model.viewportWidth / 2

        h =
            model.scale * model.viewportHeight / 2

        cameraClipDistance =
            100000
    in
    Mat4.makeOrtho -w w -h h -cameraClipDistance cameraClipDistance


makeViewMatrix : Model -> Mat4
makeViewMatrix (Model model) =
    let
        eyeDistance =
            10000

        eyePosition =
            vec3
                (eyeDistance * cos model.altitude * cos model.azimuth)
                (eyeDistance * cos model.altitude * sin model.azimuth)
                (eyeDistance * sin model.altitude)

        -- differentiate by altitude
        upVector =
            vec3
                -(sin model.altitude * cos model.azimuth)
                -(sin model.altitude * sin model.azimuth)
                (cos model.altitude)
    in
    Mat4.makeLookAt (Vec3.add model.target eyePosition) model.target upVector


doRotation : Model -> Float -> Float -> Model
doRotation (Model model) radX radY =
    -- TODO: altitudeMax and altitudeMin
    let
        azimuth =
            model.azimuth + radX

        altitude =
            model.altitude
                + radY
                |> clamp (degrees 0) (degrees 90)
    in
    Model
        { model
            | azimuth = azimuth
            , altitude = altitude
        }


doPanning : Model -> Float -> Float -> Model
doPanning (Model model) dx dy =
    let
        os =
            model.scale

        ca =
            cos model.azimuth

        sa =
            sin model.azimuth

        cb =
            cos model.altitude

        sb =
            sin model.altitude

        tanx =
            Vec3.scale (os * dx) (vec3 sa -ca 0)

        tany =
            Vec3.scale (os * -dy) (vec3 (ca * sb) (sa * sb) -cb)

        trans =
            Vec3.add model.target (Vec3.add tanx tany)
    in
    Model { model | target = trans }


doScaleAdd : Model -> Float -> Model
doScaleAdd (Model model) diff =
    Model { model | scale = clamp 0.1 100 (model.scale + diff) }


doScaleMult : Model -> Float -> Model
doScaleMult (Model model) mult =
    Model { model | scale = clamp 0.1 100 (model.scale * mult) }
