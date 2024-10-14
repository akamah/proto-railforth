module Graphics.Render exposing (Attributes, normalMatrix, renderPier, renderRail)

import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
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
    , albedo : Vec3
    , roughness : Float

    -- この場所に近いほど白くなることにする
    -- シェーダに可変長の要素を渡す方法があんまり分からなかったので固定長で行く
    , highlight1 : Vec3
    , highlight2 : Vec3
    , highlight3 : Vec3
    }


type alias Varyings =
    { varyingViewPosition : Vec3
    , varyingNormal : Vec3
    }


lightFromAbove : Vec3
lightFromAbove =
    Vec3.normalize <| vec3 2 1 5


renderRail : Mat4 -> Mat4 -> Mesh Attributes -> Vec3 -> Float -> Vec3 -> List Vec3 -> List Entity
renderRail viewMatrix projectionMatrix mesh origin angle color minusTerminals =
    let
        modelMatrix =
            makeMeshMatrix origin angle

        modelViewMatrix =
            Mat4.mul viewMatrix modelMatrix

        normalMat =
            normalMatrix modelViewMatrix

        ( highlight1, highlight2, highlight3 ) =
            makeHighlight <| List.map (Mat4.transform modelViewMatrix) minusTerminals
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
        , albedo = color
        , roughness = 1.0
        , highlight1 = highlight1
        , highlight2 = highlight2
        , highlight3 = highlight3
        }
    ]


makeHighlight : List Vec3 -> ( Vec3, Vec3, Vec3 )
makeHighlight vecs =
    let
        inf =
            vec3 10000000 10000000 10000000
    in
    case vecs of
        [] ->
            ( inf, inf, inf )

        [ x ] ->
            ( x, inf, inf )

        [ x, y ] ->
            ( x, y, inf )

        x :: y :: z :: _ ->
            ( x, y, z )


renderPier : Mat4 -> Mat4 -> Mesh Attributes -> Vec3 -> Float -> List Entity
renderPier viewMatrix projectionMatrix mesh origin angle =
    renderRail viewMatrix projectionMatrix mesh origin angle (vec3 1.0 0.85 0.3) []


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
        attribute vec3 position;
        attribute vec3 normal;
        
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform mat4 normalMatrix;

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

        uniform highp vec3 highlight1;
        uniform highp vec3 highlight2;
        uniform highp vec3 highlight3;

        varying highp vec3 varyingViewPosition;
        varying highp vec3 varyingNormal;

        highp float getHighlightIntensity(in highp vec3 highlight) {
            return min(pow((distance(-varyingViewPosition, highlight) + 1.0) / 15.0, -2.5), 1.0);
        }

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

            highp float highlight =max(getHighlightIntensity(highlight1), max(getHighlightIntensity(highlight2), getHighlightIntensity(highlight3)));


            highp vec3 fragmentColor = mix(ambient + diffuse + specular, vec3(1.0, 1.0, 1.0), highlight);


            gl_FragColor = vec4(vec3(fragmentColor), 1.0);
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
