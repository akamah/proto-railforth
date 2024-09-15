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
  - `startRotation` and `startPan` begin rotation and panning w/r
  - call `updateMouseMove`, `updateMouseUp`, and updateWheel when the user do so
  - explicitly call `updateViewport` when the drawing area is resized.
  - finally, makeTransform to get the matrix which is the result of viewing transform and perspective trannsform.

-}

import Graphics.OrbitControlImpl as Impl
import Math.Matrix4 exposing (Mat4)
import Math.Vector3 exposing (Vec3)


type Model
    = Model ModelImpl


type alias ModelImpl =
    { draggingState : Maybe DraggingState
    , ocImpl : Impl.Model
    }


type DraggingState
    = Panning ( Float, Float )
    | Rotating ( Float, Float )


init : Float -> Float -> Float -> Vec3 -> Model
init azimuth altitude scale eyeTarget =
    Model
        { draggingState = Nothing
        , ocImpl = Impl.init azimuth altitude scale eyeTarget
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
            Model
                { draggingState = Just (Rotating newPoint)
                , ocImpl = Impl.doRotation model.ocImpl oldPoint newPoint
                }

        Just (Panning oldPoint) ->
            Model
                { draggingState = Just (Panning newPoint)
                , ocImpl = Impl.doPanning model.ocImpl oldPoint newPoint
                }


updateMouseUp : Model -> ( Float, Float ) -> Model
updateMouseUp (Model model) _ =
    Model { model | draggingState = Nothing }


updateWheel : Model -> ( Float, Float ) -> Model
updateWheel (Model model) ( _, dy ) =
    Model
        { model | ocImpl = Impl.doDolly model.ocImpl dy }


updateViewport : Float -> Float -> Model -> Model
updateViewport w h (Model model) =
    Model { model | ocImpl = Impl.updateViewport model.ocImpl w h }


makeTransform : Model -> Mat4
makeTransform (Model model) =
    Impl.makeTransform model.ocImpl


isDragging : Model -> Bool
isDragging (Model model) =
    case model.draggingState of
        Just _ ->
            True

        Nothing ->
            False
