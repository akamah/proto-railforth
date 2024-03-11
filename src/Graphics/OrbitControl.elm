module Graphics.OrbitControl exposing
    ( Model
    , init
    , isDragging
    , makeTransform
    , updateMouseDown
    , updateMouseDownWithShift
    , updateMouseMove
    , updateMouseUp
    , updateViewport
    , updateWheel
    )

{-| The simple orbit control

  - Mouse: rotation
  - Shift+Mouse: panning
  - Wheel: dolly


## Usage

  - use `init` to initialize the state of OrbitControl
  - `updateMouseDown` and `updateMouseDownWithShift` begin rotation and panning w/r
  - call `updateMouseMove`, `updateMouseUp`, and updateWheel when the user do so
  - explicitly call `updateViewport` when the drawing area is resized.
  - finally, makeTransform to get the matrix which is the result of viewing transform and perspective trannsform.

-}

import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)


type alias Model =
    { draggingState : Maybe DraggingState
    , viewportWidth : Float
    , viewportHeight : Float
    , azimuth : Float
    , altitude : Float
    , scale : Float
    , target : Vec3
    }


type DraggingState
    = Panning ( Float, Float )
    | Rotating ( Float, Float )


init : Float -> Float -> Float -> Vec3 -> Model
init azimuth altitude scale target =
    { draggingState = Nothing
    , viewportWidth = 0
    , viewportHeight = 0
    , azimuth = azimuth
    , altitude = altitude
    , scale = scale
    , target = target
    }


updateMouseDown : Model -> ( Float, Float ) -> Model
updateMouseDown model pos =
    { model | draggingState = Just (Rotating pos) }


updateMouseDownWithShift : Model -> ( Float, Float ) -> Model
updateMouseDownWithShift model pos =
    { model | draggingState = Just (Panning pos) }


updateMouseMove : Model -> ( Float, Float ) -> Model
updateMouseMove model newPoint =
    case model.draggingState of
        Nothing ->
            model

        Just (Rotating oldPoint) ->
            doRotation model (Just <| Rotating newPoint) oldPoint newPoint

        Just (Panning oldPoint) ->
            doPanning model (Just <| Panning newPoint) oldPoint newPoint


updateMouseUp : Model -> ( Float, Float ) -> Model
updateMouseUp model _ =
    { model | draggingState = Nothing }


updateWheel : Model -> ( Float, Float ) -> Model
updateWheel model ( _, dy ) =
    doDolly model dy


updateViewport : Float -> Float -> Model -> Model
updateViewport w h model =
    { model | viewportWidth = w, viewportHeight = h }


makeTransform : Model -> Mat4
makeTransform model =
    let
        w =
            model.scale * model.viewportWidth / 2

        h =
            model.scale * model.viewportHeight / 2

        eyeDistance =
            10000

        cameraClipDistance =
            100000

        x =
            eyeDistance * cos model.altitude * cos model.azimuth

        y =
            eyeDistance * sin model.altitude

        z =
            eyeDistance * cos model.altitude * -(sin model.azimuth)
    in
    Mat4.mul
        (Mat4.makeOrtho -w w -h h -cameraClipDistance cameraClipDistance)
        (Mat4.makeLookAt (Vec3.add model.target (vec3 x y z)) model.target (vec3 0 1 0))


isDragging : Model -> Bool
isDragging model =
    case model.draggingState of
        Just _ ->
            True

        Nothing ->
            False



-- module private functions


doRotation : Model -> Maybe DraggingState -> ( Float, Float ) -> ( Float, Float ) -> Model
doRotation model newState ( x0, y0 ) ( x, y ) =
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
    { model
        | draggingState = newState
        , azimuth = azimuth
        , altitude = altitude
    }


doPanning : Model -> Maybe DraggingState -> ( Float, Float ) -> ( Float, Float ) -> Model
doPanning model newState ( x0, y0 ) ( x, y ) =
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
            Vec3.scale (os * dx) (vec3 sa 0 ca)

        tany =
            Vec3.scale (os * dy) (vec3 (ca * sb) -cb -(sa * sb))

        trans =
            Vec3.add model.target (Vec3.add tanx tany)
    in
    { model
        | draggingState = newState
        , target = trans
    }


doDolly : Model -> Float -> Model
doDolly model dy =
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
    { model | scale = next }
