module Graphics.OrbitControlImpl exposing
    ( Model
    , doDolly
    , doPanning
    , doRotation
    , init
    , makeTransform
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


makeTransform : Model -> Mat4
makeTransform (Model model) =
    let
        w =
            model.scale * model.viewportWidth / 2

        h =
            model.scale * model.viewportHeight / 2

        eyeDistance =
            10000

        cameraClipDistance =
            100000

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
    Mat4.mul
        (Mat4.makeOrtho -w w -h h -cameraClipDistance cameraClipDistance)
        (Mat4.makeLookAt (Vec3.add model.target eyePosition) model.target upVector)


doRotation : Model -> ( Float, Float ) -> ( Float, Float ) -> Model
doRotation (Model model) ( x0, y0 ) ( x, y ) =
    let
        dx =
            x - x0

        dy =
            y - y0

        azimuth =
            model.azimuth - dx * degrees 0.3

        altitude =
            model.altitude
                - dy
                * degrees 0.3
                |> clamp (degrees 0) (degrees 90)
    in
    Model
        { model
            | azimuth = azimuth
            , altitude = altitude
        }


doPanning : Model -> ( Float, Float ) -> ( Float, Float ) -> Model
doPanning (Model model) ( x0, y0 ) ( x, y ) =
    let
        dx =
            x - x0

        dy =
            -(y - y0)

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
            Vec3.scale (os * dy) (vec3 (ca * sb) (sa * sb) -cb)

        trans =
            Vec3.add model.target (Vec3.add tanx tany)
    in
    Model { model | target = trans }


doDolly : Model -> Float -> Model
doDolly (Model model) dy =
    let
        multiplier =
            1.02

        delta =
            if dy < 0 then
                -- zoom out
                1 / multiplier

            else if dy > 0 then
                -- zoom in
                1 * multiplier

            else
                1

        next =
            model.scale * delta
    in
    Model { model | scale = next }
