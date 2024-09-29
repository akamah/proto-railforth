module Graphics.Render exposing
    ( Attributes
    , normalMatrix
    , renderFloor
    , renderFloorAmbient
    , renderPier
    , renderPierAmbient
    , renderRailAmbient
    , renderRailBody
    , renderRailShadow
    )

import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Types.Rail exposing (Rail(..))
import WebGL exposing (Entity, Mesh, Shader)
import WebGL.Settings
import WebGL.Settings.DepthTest as DepthTest
import WebGL.Settings.StencilTest as StencilTest


type alias Attributes =
    { position : Vec3
    , normal : Vec3
    }


type alias Uniforms =
    { modelViewMatrix : Mat4
    , projectionMatrix : Mat4
    , normalMatrix : Mat4
    , light : Vec3
    , albedo : Vec3
    , roughness : Float
    }


type alias Varyings =
    { varyingViewPosition : Vec3
    , varyingNormal : Vec3
    }


lightFromAbove : Vec3
lightFromAbove =
    Vec3.normalize <| vec3 2 1 5


renderAmbient mesh uniforms =
    [ WebGL.entityWith
        [ DepthTest.default
        , DepthTest.less { write = True, near = 0, far = 1 }
        , StencilTest.test
            { ref = 1
            , mask = 0xFF
            , test = StencilTest.lessOrEqual
            , fail = StencilTest.keep
            , zfail = StencilTest.keep
            , zpass = StencilTest.keep
            , writeMask = 0x00
            }
        ]
        ambientVertexShader
        ambientFragmentShader
        mesh
        uniforms
    ]


renderShadow : Shader attributes uniforms varyings -> Shader {} uniforms varyings -> Mesh attributes -> uniforms -> List Entity
renderShadow vertexShader fragmentShader mesh uniforms =
    [ WebGL.entityWith
        [ DepthTest.default
        , DepthTest.less { write = False, near = 0, far = 1 }
        , WebGL.Settings.colorMask False False False False
        , StencilTest.testSeparate
            { ref = 0
            , mask = 0xFF
            , writeMask = 0xFF
            }
            { test = StencilTest.always
            , fail = StencilTest.keep
            , zfail = StencilTest.keep
            , zpass = StencilTest.incrementWrap
            }
            { test = StencilTest.always
            , fail = StencilTest.keep
            , zfail = StencilTest.keep
            , zpass = StencilTest.decrementWrap
            }
        ]
        vertexShader
        fragmentShader
        mesh
        uniforms
    ]


renderBody : Shader attributes uniforms varyings -> Shader {} uniforms varyings -> Mesh attributes -> uniforms -> List Entity
renderBody vertexShader fragmentShader mesh uniforms =
    [ WebGL.entityWith
        [ DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.back
        ]
        vertexShader
        fragmentShader
        mesh
        uniforms
    ]


floorMesh : Mesh { position : Vec3 }
floorMesh =
    let
        inf =
            1000000
    in
    WebGL.triangleFan
        [ { position = vec3 inf inf 0 }
        , { position = vec3 -inf inf 0 }
        , { position = vec3 -inf -inf 0 }
        , { position = vec3 inf -inf 0 }
        ]


renderFloorAmbient : Mat4 -> Mat4 -> Vec3 -> List Entity
renderFloorAmbient viewMatrix projectionMatrix color =
    renderAmbient
        floorMesh
        { modelViewMatrix = viewMatrix
        , projectionMatrix = projectionMatrix
        , color = color
        }


renderFloor : Mat4 -> Mat4 -> Vec3 -> List Entity
renderFloor viewMatrix projectionMatrix color =
    renderBody
        floorVertexShader
        floorFragmentShader
        floorMesh
        { modelViewMatrix = viewMatrix
        , projectionMatrix = projectionMatrix
        , color = color
        }


renderRailBody : Mat4 -> Mat4 -> Mesh Attributes -> Vec3 -> Float -> Vec3 -> List Entity
renderRailBody viewMatrix projectionMatrix mesh origin angle color =
    let
        modelMatrix =
            makeMeshMatrix origin angle

        modelViewMatrix =
            Mat4.mul viewMatrix modelMatrix

        normalMat =
            normalMatrix modelViewMatrix
    in
    renderBody
        railVertexShader
        railFragmentShader
        mesh
        { modelViewMatrix = modelViewMatrix
        , projectionMatrix = projectionMatrix
        , normalMatrix = normalMat
        , light = Mat4.transform (normalMatrix viewMatrix) lightFromAbove
        , albedo = color
        , roughness = 1.0
        }


renderPier : Mat4 -> Mat4 -> Mesh Attributes -> Vec3 -> Float -> List Entity
renderPier viewMatrix projectionMatrix mesh origin angle =
    renderRailBody viewMatrix projectionMatrix mesh origin angle (vec3 1.0 0.85 0.3)


renderRailAmbient viewMatrix projectionMatrix mesh origin angle color =
    let
        modelMatrix =
            makeMeshMatrix origin angle

        modelViewMatrix =
            Mat4.mul viewMatrix modelMatrix
    in
    renderAmbient
        mesh
        { modelViewMatrix = modelViewMatrix
        , projectionMatrix = projectionMatrix
        , color = Vec3.scale 0.3 color
        }


renderPierAmbient viewMatrix projectionMatrix mesh origin angle =
    renderRailAmbient viewMatrix projectionMatrix mesh origin angle (vec3 1.0 0.85 0.3)


renderRailShadow : Mat4 -> Mat4 -> Mesh Attributes -> Vec3 -> Float -> List Entity
renderRailShadow viewMatrix projectionMatrix mesh origin angle =
    let
        modelMatrix =
            makeMeshMatrix origin angle

        modelViewMatrix =
            Mat4.mul viewMatrix modelMatrix

        normalMat =
            normalMatrix modelViewMatrix
    in
    renderShadow
        railVertexShader
        railFragmentShader
        mesh
        { modelViewMatrix = modelViewMatrix
        , projectionMatrix = projectionMatrix
        , normalMatrix = normalMat
        , light = Mat4.transform (normalMatrix viewMatrix) lightFromAbove
        , albedo = vec3 0.5 0.5 0.5
        , roughness = 1.0
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


railVertexShader : Shader Attributes Uniforms Varyings
railVertexShader =
    [glsl|
        attribute highp vec3 position;
        attribute highp vec3 normal;
        
        uniform highp mat4 modelViewMatrix;
        uniform highp mat4 projectionMatrix;
        uniform highp mat4 normalMatrix;

        varying highp vec3 varyingViewPosition;
        varying highp vec3 varyingNormal;

        void main() {
            highp vec4 cameraPosition = modelViewMatrix * vec4(position, 1.0);
            varyingNormal = (normalMatrix * vec4(normal, 0.0)).xyz;
            varyingViewPosition = -cameraPosition.xyz;

            gl_Position = projectionMatrix * cameraPosition;
        }
    |]


railFragmentShader : Shader {} Uniforms Varyings
railFragmentShader =
    [glsl|
        uniform highp vec3 light;
        uniform highp vec3 albedo;
        uniform highp float roughness;

        varying highp vec3 varyingViewPosition;
        varying highp vec3 varyingNormal;

        void main() {
            highp vec3 nLight = normalize(light);
            highp vec3 nViewPosition = normalize(varyingViewPosition);
            highp vec3 nNormal = normalize(varyingNormal);
            highp vec3 nHalfway = normalize(nLight + nViewPosition);

            highp vec3 ambient = 0.3 * albedo;

            // https://mimosa-pudica.net/improved-oren-nayar.html
            highp float dotLightNormal = dot(nLight, nNormal);
            highp float dotViewNormal = dot(nViewPosition, nNormal);
            highp float s = dot(nLight, nViewPosition) - dotLightNormal * dotViewNormal;
            highp float t = mix(1.0, max(dotLightNormal, dotViewNormal), step(0.0, s));
            highp float orenNayerA = 1.0 - 0.5 * (roughness / (roughness + 0.33));
            highp float orenNayerB = 0.45 * (roughness / (roughness + 0.09));

            highp vec3 diffuse = 0.8 * albedo * max(dotLightNormal, 0.0) * (orenNayerA + orenNayerB * s / t);
            highp vec3 specular = vec3(0.2 * pow(clamp(dot(nHalfway, nNormal), 0.0, 1.0), 30.0));

            highp vec3 fragmentColor = ambient + diffuse + specular;

            gl_FragColor = vec4(vec3(fragmentColor), 1.0);
        }
    |]


ambientVertexShader =
    [glsl|
        attribute highp vec3 position;
        
        uniform highp mat4 modelViewMatrix;
        uniform highp mat4 projectionMatrix;

        void main() {
            highp vec4 pos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            // increment the value to draw the shadow in front of objects
            gl_Position = pos + vec4(0.0, 0.0, -0.5, 0.0);
        }
    |]


ambientFragmentShader =
    [glsl|
        uniform highp vec3 color;

        void main() {
            gl_FragColor = vec4(color, 1.0);
        }
    |]


floorVertexShader =
    [glsl|
        attribute highp vec3 position;
        
        uniform highp mat4 modelViewMatrix;
        uniform highp mat4 projectionMatrix;

        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    |]


floorFragmentShader =
    [glsl|
        uniform highp vec3 color;

        void main() {
            gl_FragColor = vec4(color, 1.0);
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
