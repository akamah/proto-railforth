module Graphics.OrbitControl exposing
    ( Model
    , init
    , isDragging
    , makeTransform
    , updatePointerDown
    , updatePointerMove
    , updatePointerUp
    , updateViewport
    , updateWheel
    )

import Dict exposing (Dict)
import Graphics.OrbitControlImpl as Impl
import Math.Matrix4 exposing (Mat4)
import Math.Vector3 exposing (Vec3)


type Model
    = Model ModelImpl


type alias PointerId =
    Int


type alias ModelImpl =
    { draggingState : Maybe DraggingState -- for mouse event, remember if shift key is pressed
    , points : Dict Int ( Float, Float )
    , ocImpl : Impl.Model
    }


type DraggingState
    = Panning
    | Rotating


init : Float -> Float -> Float -> Vec3 -> Model
init azimuth altitude scale eyeTarget =
    Model
        { draggingState = Nothing
        , points = Dict.empty
        , ocImpl = Impl.init azimuth altitude scale eyeTarget
        }


updatePointerDown : Model -> PointerId -> ( Float, Float ) -> Bool -> Model
updatePointerDown (Model model) pointerId pos shiftKey =
    let
        next =
            if shiftKey then
                Panning

            else
                Rotating
    in
    Model
        { model
            | draggingState = Just next
            , points = Dict.insert pointerId pos model.points
        }


updatePointerMove : Model -> PointerId -> ( Float, Float ) -> Model
updatePointerMove (Model model) pointerId newPoint =
    let
        updatedPoints =
            Dict.insert pointerId newPoint model.points
    in
    case ( Dict.size model.points, model.draggingState, Dict.get pointerId model.points ) of
        ( 1, Just Rotating, Just oldPoint ) ->
            Model
                { model
                    | ocImpl = Impl.doRotation model.ocImpl oldPoint newPoint
                    , points = updatedPoints
                }

        ( 1, Just Panning, Just oldPoint ) ->
            Model
                { model
                    | ocImpl = Impl.doPanning model.ocImpl oldPoint newPoint
                    , points = updatedPoints
                }

        ( 2, _, Just oldPoint ) ->
            case getOtherElement pointerId model.points of
                Just otherPoint ->
                    Model
                        { model
                            | ocImpl =
                                doTwoPointersMove model.ocImpl
                                    { oldPoint = oldPoint
                                    , newPoint = newPoint
                                    , otherPoint = otherPoint
                                    }
                            , points = updatedPoints
                        }

                _ ->
                    Model { model | points = updatedPoints }

        _ ->
            Model { model | points = updatedPoints }


updatePointerUp : Model -> PointerId -> Model
updatePointerUp (Model model) pointerId =
    Model
        { model
            | draggingState = Nothing
            , points = Dict.remove pointerId model.points
        }


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
    Dict.size model.points > 0


doTwoPointersMove :
    Impl.Model
    ->
        { oldPoint : ( Float, Float )
        , newPoint : ( Float, Float )
        , otherPoint : ( Float, Float )
        }
    -> Impl.Model
doTwoPointersMove ocImpl { oldPoint, newPoint, otherPoint } =
    let
        scale =
            distance newPoint otherPoint / distance oldPoint otherPoint

        ( dx, dy ) =
            sub2 newPoint oldPoint
    in
    ocImpl


{-| get any value other than a given key
-}
getOtherElement : comparable -> Dict comparable v -> Maybe v
getOtherElement key =
    Dict.partition (\k _ -> k /= key)
        >> Tuple.first
        >> Dict.values
        >> List.head


distance : ( Float, Float ) -> ( Float, Float ) -> Float
distance ( px, py ) ( qx, qy ) =
    sqrt ((px - qx) ^ 2 + (py - qy) ^ 2)


sub2 : ( Float, Float ) -> ( Float, Float ) -> ( Float, Float )
sub2 ( px, py ) ( qx, qy ) =
    ( (px - qx) / 2, (py - qy) / 2 )
