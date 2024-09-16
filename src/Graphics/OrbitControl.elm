module Graphics.OrbitControl exposing
    ( Model
    , init
    , isDragging
    , makeTransform
    , updateMouseMove
    , updateMouseUp
    , updatePointerDown
    , updateViewport
    , updateWheel
    )

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


updatePointerDown : Model -> ( Float, Float ) -> Bool -> Model
updatePointerDown (Model model) pos shiftKey =
    let
        next =
            if shiftKey then
                Panning

            else
                Rotating
    in
    Model { model | draggingState = Just (next pos) }


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


updateMouseUp : Model -> Model
updateMouseUp (Model model) =
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
