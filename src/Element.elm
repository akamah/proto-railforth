port module Element exposing (setPointerCapture)

{- inspired by mpizenberg/elm-pointer-events
   https://github.com/mpizenberg/elm-pointer-events
-}

import Json.Encode


port setPointerCapture : Json.Encode.Value -> Cmd msg
