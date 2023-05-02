port module Storage exposing (load, save)

{-| LocalStrageを使うための port module.
設定項目が増えたならここを加筆するかもしれない。
現状、index.htmlに対応するJavaScriptのportを書いている。
-}


port save : String -> Cmd msg


port load : (String -> msg) -> Sub msg
