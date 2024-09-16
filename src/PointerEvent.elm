port module PointerEvent exposing (PointerEvent, decode, setPointerCapture)

{- inspired by mpizenberg/elm-pointer-events
   https://github.com/mpizenberg/elm-pointer-events
-}

import Json.Decode as JD


type alias PointerEvent =
    { pointerId : Int
    , clientX : Float
    , clientY : Float
    , shiftKey : Bool
    , event : JD.Value -- PointerEvent object
    }


setPointerCapture : PointerEvent -> Cmd msg
setPointerCapture { event } =
    setPointerCaptureImpl event


decode : JD.Decoder PointerEvent
decode =
    JD.map5 PointerEvent
        (JD.field "pointerId" JD.int)
        (JD.field "clientX" JD.float)
        (JD.field "clientY" JD.float)
        (JD.field "shiftKey" JD.bool)
        JD.value


port setPointerCaptureImpl : JD.Value -> Cmd msg
