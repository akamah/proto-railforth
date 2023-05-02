port module Storage exposing (load, save)


port save : String -> Cmd msg


port load : (String -> msg) -> Sub msg
