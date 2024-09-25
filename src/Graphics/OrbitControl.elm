module Graphics.OrbitControl exposing
    ( Model
    , init
    , isDragging
    , makeProjectionMatrix
    , makeViewMatrix
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
                    | ocImpl = doRotation model.ocImpl newPoint oldPoint
                    , points = updatedPoints
                }

        ( 1, Just Panning, Just oldPoint ) ->
            Model
                { model
                    | ocImpl = doPanning model.ocImpl newPoint oldPoint
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
updateWheel (Model model) ( dx, dy ) =
    Model
        { model | ocImpl = doDolly model.ocImpl dx dy }


updateViewport : Float -> Float -> Model -> Model
updateViewport w h (Model model) =
    Model { model | ocImpl = Impl.updateViewport model.ocImpl w h }


makeProjectionMatrix : Model -> Mat4
makeProjectionMatrix (Model model) =
    Impl.makeProjectionMatrix model.ocImpl


makeViewMatrix : Model -> Mat4
makeViewMatrix (Model model) =
    Impl.makeViewMatrix model.ocImpl


isDragging : Model -> Bool
isDragging (Model model) =
    Dict.size model.points > 0


doRotation : Impl.Model -> ( Float, Float ) -> ( Float, Float ) -> Impl.Model
doRotation ocImpl ( newX, newY ) ( oldX, oldY ) =
    let
        -- 画面を右へドラッグすると左から回り込むように見ることになるので、この座標系だとazimuthは減る方向になる
        radX =
            -(newX - oldX) * degrees 0.3

        -- 画面のY軸が増える方向はaltitudeが小さくなる方向なのでマイナスをつける
        radY =
            -(newY - oldY) * degrees 0.3
    in
    Impl.doRotation ocImpl radX radY


doPanning : Impl.Model -> ( Float, Float ) -> ( Float, Float ) -> Impl.Model
doPanning ocImpl ( newX, newY ) ( oldX, oldY ) =
    Impl.doPanning ocImpl (newX - oldX) (newY - oldY)


doDolly : Impl.Model -> Float -> Float -> Impl.Model
doDolly ocImpl dx dy =
    if abs dx >= abs dy then
        ocImpl

    else
        Impl.doScaleMult ocImpl (1.002 ^ dy)


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
            distance oldPoint otherPoint / distance newPoint otherPoint

        ( dx, dy ) =
            sub2 newPoint oldPoint
    in
    Impl.doScaleMult (Impl.doPanning ocImpl dx dy) scale


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
