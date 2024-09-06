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


type Model
    = Model ModelImpl


type alias ModelImpl =
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
init azimuth altitude scale eyeTarget =
    Model
        { draggingState = Nothing
        , viewportWidth = 0
        , viewportHeight = 0
        , azimuth = azimuth
        , altitude = altitude
        , scale = scale
        , target = eyeTarget
        }


updateMouseDown : Model -> ( Float, Float ) -> Model
updateMouseDown (Model model) pos =
    Model { model | draggingState = Just (Rotating pos) }


updateMouseDownWithShift : Model -> ( Float, Float ) -> Model
updateMouseDownWithShift (Model model) pos =
    Model { model | draggingState = Just (Panning pos) }


updateMouseMove : Model -> ( Float, Float ) -> Model
updateMouseMove (Model model) newPoint =
    case model.draggingState of
        Nothing ->
            Model model

        Just (Rotating oldPoint) ->
            Model <| doRotation model (Just <| Rotating newPoint) oldPoint newPoint

        Just (Panning oldPoint) ->
            Model <| doPanning model (Just <| Panning newPoint) oldPoint newPoint


updateMouseUp : Model -> ( Float, Float ) -> Model
updateMouseUp (Model model) _ =
    Model { model | draggingState = Nothing }


updateWheel : Model -> ( Float, Float ) -> Model
updateWheel (Model model) ( _, dy ) =
    Model <| doDolly model dy


updateViewport : Float -> Float -> Model -> Model
updateViewport w h (Model model) =
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


isDragging : Model -> Bool
isDragging (Model model) =
    case model.draggingState of
        Just _ ->
            True

        Nothing ->
            False



-- module private functions


doRotation : ModelImpl -> Maybe DraggingState -> ( Float, Float ) -> ( Float, Float ) -> ModelImpl
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


doPanning : ModelImpl -> Maybe DraggingState -> ( Float, Float ) -> ( Float, Float ) -> ModelImpl
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
            Vec3.scale (os * dx) (vec3 sa -ca 0)

        tany =
            Vec3.scale (os * dy) (vec3 (ca * sb) (sa * sb) -cb)

        trans =
            Vec3.add model.target (Vec3.add tanx tany)
    in
    { model
        | draggingState = newState
        , target = trans
    }


doDolly : ModelImpl -> Float -> ModelImpl
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
