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
    { cameraTransform : Mat4
    , modelTransform : Mat4
    , light : Vec3
    , color : Vec3
    }


lightFromAbove : Vec3
lightFromAbove =
    vec3 (2.0 / 27.0) (7.0 / 27.0) (26.0 / 27.0)


renderRail : Mat4 -> Mesh Attributes -> Vec3 -> Float -> Vec3 -> List Entity
renderRail cameraTransform mesh origin angle color =
    let
        modelTransform =
            makeMeshMatrix origin angle
    in
    [ WebGL.entityWith
        [ WebGL.Settings.DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.back
        ]
        railVertexShader
        railFragmentShader
        mesh
        { cameraTransform = cameraTransform
        , modelTransform = modelTransform
        , light = lightFromAbove
        , color = color
        }
    ]


renderPier : Mat4 -> Mesh Attributes -> Vec3 -> Float -> Entity
renderPier cameraTransform mesh origin angle =
    let
        modelTransform =
            makeMeshMatrix origin angle
    in
    WebGL.entityWith
        [ WebGL.Settings.DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.back
        ]
        pierVertexShader
        pierFragmentShader
        mesh
        { cameraTransform = cameraTransform
        , modelTransform = modelTransform
        , light = lightFromAbove
        , color = vec3 1.0 0.85 0.3
        }


makeMeshMatrix : Vec3 -> Float -> Mat4
makeMeshMatrix origin angle =
    let
        position =
            Mat4.makeTranslate origin

        rotate =
            Mat4.makeRotate angle (vec3 0 0 1)
    in
    Mat4.mul position rotate


railVertexShader : Shader Attributes Uniforms { edge : Float, fragmentColor : Vec3 }
railVertexShader =
    -- シェーダ周り、というか描画周りはモジュールに分けてしまいたい
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 modelTransform;
        uniform mat4 cameraTransform;
        uniform vec3 light;
        uniform vec3 color;
        
        varying highp float edge;
        varying highp vec3 fragmentColor;

        void main() {
            highp vec4 worldPosition = modelTransform * vec4(position, 1.0);
            highp vec4 worldNormal = normalize(modelTransform * vec4(normal, 0.0));

            highp float lambertFactor = dot(worldNormal, vec4(light, 0));
            highp float intensity = 0.3 + 0.7 * lambertFactor;
            fragmentColor = intensity * color;

            edge = distance(vec3(0.0, 0.0, 0.0), position);

            gl_Position = cameraTransform * worldPosition;
        }
    |]


railFragmentShader : Shader {} Uniforms { edge : Float, fragmentColor : Vec3 }
railFragmentShader =
    [glsl|
        varying highp float edge;
        varying highp vec3 fragmentColor;

        void main() {
            highp float dist_density = min(edge / 30.0 + 0.2, 1.0);
            gl_FragColor = vec4(fragmentColor, dist_density);
        }
    |]


pierVertexShader : Shader Attributes Uniforms { fragmentColor : Vec3 }
pierVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 modelTransform;
        uniform mat4 cameraTransform;
        uniform vec3 light;
        uniform vec3 color;

        varying highp vec3 fragmentColor;

        void main() {
            highp vec4 worldPosition = modelTransform * vec4(position, 1.0);
            highp vec4 worldNormal = normalize(modelTransform * vec4(normal, 0.0));

            highp float lambertFactor = dot(worldNormal, vec4(light, 0));
            highp float intensity = 0.5 + 0.5 * lambertFactor;
            fragmentColor = intensity * color;

            gl_Position = cameraTransform * worldPosition;
        }
    |]


pierFragmentShader : Shader {} Uniforms { fragmentColor : Vec3 }
pierFragmentShader =
    [glsl|
        varying highp vec3 fragmentColor;

        void main() {
            gl_FragColor = vec4(fragmentColor, 1.0);
        }
    |]
