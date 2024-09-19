module Graphics.Render exposing (Attributes, renderPier, renderRail)

import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 exposing (Vec3, vec3)
import Types.Rail exposing (Rail(..))
import WebGL exposing (Entity, Mesh, Shader)
import WebGL.Settings
import WebGL.Settings.DepthTest


type alias Attributes =
    { position : Vec3
    , normal : Vec3
    }


type alias Uniforms =
    { modelViewMatrix : Mat4
    , projectionMatrix : Mat4
    , normalMatrix : Mat4
    , light : Vec3
    , color : Vec3
    }


type alias Varyings =
    { varyingViewPosition : Vec3
    , varyingNormal : Vec3
    }


lightFromAbove : Vec3
lightFromAbove =
    vec3 (2.0 / 27.0) (7.0 / 27.0) (26.0 / 27.0)


renderRail : Mat4 -> Mat4 -> Mesh Attributes -> Vec3 -> Float -> Vec3 -> List Entity
renderRail viewMatrix projectionMatrix mesh origin angle color =
    let
        modelMatrix =
            makeMeshMatrix origin angle

        modelViewMatrix =
            Mat4.mul viewMatrix modelMatrix

        normalMat =
            normalMatrix modelViewMatrix
    in
    [ WebGL.entityWith
        [ WebGL.Settings.DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.back
        ]
        railVertexShader
        railFragmentShader
        mesh
        { modelViewMatrix = modelViewMatrix
        , projectionMatrix = projectionMatrix
        , normalMatrix = normalMat
        , light = Mat4.transform (normalMatrix viewMatrix) lightFromAbove
        , color = color
        }
    ]


renderPier : Mat4 -> Mat4 -> Mesh Attributes -> Vec3 -> Float -> List Entity
renderPier viewMatrix projectionMatrix mesh origin angle =
    renderRail viewMatrix projectionMatrix mesh origin angle (vec3 1.0 0.85 0.3)


makeMeshMatrix : Vec3 -> Float -> Mat4
makeMeshMatrix origin angle =
    let
        position =
            Mat4.makeTranslate origin

        rotate =
            Mat4.makeRotate angle (vec3 0 0 1)
    in
    Mat4.mul position rotate


railVertexShader : Shader Attributes Uniforms { fragmentColor : Vec3 }
railVertexShader =
    -- シェーダ周り、というか描画周りはモジュールに分けてしまいたい
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform mat4 normalMatrix;
        uniform vec3 light;
        uniform vec3 color;
        
        varying highp vec3 fragmentColor;

        void main() {
            highp vec4 cameraPosition = modelViewMatrix * vec4(position, 1.0);
            highp vec4 cameraNormal = normalize(normalMatrix * vec4(normal, 0.0));

            highp float lambertFactor = clamp(dot(cameraNormal, vec4(light, 0)), 0.0, 1.0);
            highp float intensity = 0.3 + 0.7 * lambertFactor;
            fragmentColor = intensity * color;

            gl_Position = projectionMatrix * cameraPosition;
        }
    |]


railFragmentShader : Shader {} Uniforms { fragmentColor : Vec3 }
railFragmentShader =
    [glsl|
        varying highp vec3 fragmentColor;

        void main() {
            gl_FragColor = vec4(fragmentColor, 1.0);
        }
    |]


normalMatrix : Mat4 -> Mat4
normalMatrix mat =
    case Mat4.inverse (toMat3 mat) of
        Just inverted ->
            Mat4.transpose inverted

        Nothing ->
            Mat4.identity


toMat3 : Mat4 -> Mat4
toMat3 mat =
    let
        record =
            Mat4.toRecord mat
    in
    Mat4.fromRecord <|
        { record
            | m14 = 0.0
            , m24 = 0.0
            , m34 = 0.0
            , m41 = 0.0
            , m42 = 0.0
            , m43 = 0.0
            , m44 = 1.0
        }
