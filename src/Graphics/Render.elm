module Graphics.Render exposing (showPiers, showRails)

import Graphics.MeshLoader as MeshLoader exposing (Mesh)
import Graphics.MeshWithScalingVector as SV
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 exposing (Vec3, vec3)
import Math.Vector4 exposing (Vec4, vec4)
import Types.PierPlacement exposing (PierPlacement)
import Types.RailPlacement exposing (RailPlacement)
import WebGL exposing (Entity, Shader)
import WebGL.Settings
import WebGL.Settings.DepthTest
import WebGL.Settings.StencilTest


showRails : MeshLoader.Model -> List RailPlacement -> Mat4 -> List Entity
showRails meshes rails transform =
    List.concatMap
        (\railPosition ->
            showRail
                Mat4.identity
                transform
                (MeshLoader.getRailMesh meshes railPosition.rail)
                railPosition.position
                railPosition.angle
        )
        rails


lightFromAbove : Vec3
lightFromAbove =
    vec3 (2.0 / 27.0) (26.0 / 27.0) (7.0 / 27.0)


showRail : Mat4 -> Mat4 -> Mesh -> Vec3 -> Float -> List Entity
showRail projectionTransform viewTransform mesh origin angle =
    let
        modelTransform =
            makeMeshMatrix origin angle
    in
    [ -- 輪郭をくりぬいた中身のマスクをステンシルバッファにのみ書き込む。
      --   WebGL.entityWith
      --     [ WebGL.Settings.DepthTest.default
      --     , WebGL.Settings.cullFace WebGL.Settings.back
      --     --        , WebGL.Settings.colorMask False False False False
      --     , WebGL.Settings.StencilTest.test
      --         { ref = 1
      --         , mask = 0xFF
      --         , writeMask = 0xFF
      --         , test = WebGL.Settings.StencilTest.always
      --         , fail = WebGL.Settings.StencilTest.keep
      --         , zfail = WebGL.Settings.StencilTest.keep
      --         , zpass = WebGL.Settings.StencilTest.replace
      --         }
      --     ]
      --     outlineVertexShader
      --     outlineFragmentShader
      --     mesh
      --     { projectionTransform = projectionTransform
      --     , viewTransform = viewTransform
      --     , modelTransform = modelTransform
      --     , color = vec4 0.0 1.0 0.5 1.0
      --     , light = lightFromAbove
      --     , scalingFactor = -1.7
      --     }
      -- , -- 輪郭線の部分を書き込む。cullFace frontでやるので裏を描く感じ。ステンシルバッファは変更しない
      --   WebGL.entityWith
      --     [ WebGL.Settings.DepthTest.default
      --     , WebGL.Settings.cullFace WebGL.Settings.front
      --     ]
      --     outlineVertexShader
      --     outlineFragmentShader
      --     mesh
      --     { projectionTransform = projectionTransform
      --     , viewTransform = viewTransform
      --     , modelTransform = modelTransform
      --     , color = vec4 0.2 0.2 0.2 1.0
      --     , light = lightFromAbove
      --     , scalingFactor = 0.0
      --     }
      -- , -- テスト。ステンシルバッファが1のときにベタ塗りする
      --   WebGL.entityWith
      --     [ WebGL.Settings.DepthTest.always { write = True, near = 0, far = 1 }
      --     , WebGL.Settings.cullFace WebGL.Settings.back
      --     , WebGL.Settings.StencilTest.test
      --         { ref = 1
      --         , mask = 0xFF
      --         , writeMask = 0xFF
      --         , test = WebGL.Settings.StencilTest.equal
      --         , fail = WebGL.Settings.StencilTest.keep
      --         , zfail = WebGL.Settings.StencilTest.keep
      --         , zpass = WebGL.Settings.StencilTest.decrementWrap
      --         }
      --     ]
      --     outlineVertexShader
      --     outlineFragmentShader
      --     mesh
      --     { projectionTransform = projectionTransform
      --     , viewTransform = viewTransform
      --     , modelTransform = modelTransform
      --     , color = vec4 0.5 0.5 0.2 1.0
      --     , scalingFactor = 0
      --     }
      -- レール本体を描画する。この際に最初のマスクの部分のみに対して描画を行う
      -- , WebGL.entityWith
      --     [ WebGL.Settings.DepthTest.always { write = True, near = 0.0, far = 1.0 }
      --     , WebGL.Settings.cullFace WebGL.Settings.back
      --     , WebGL.Settings.StencilTest.test
      --         { ref = 1
      --         , mask = 0xFF
      --         , writeMask = 0xFF
      --         , test = WebGL.Settings.StencilTest.equal
      --         , fail = WebGL.Settings.StencilTest.keep
      --         , zfail = WebGL.Settings.StencilTest.keep
      --         , zpass = WebGL.Settings.StencilTest.decrementWrap
      --         }
      --     ]
      --     railVertexShader
      --     railFragmentShader
      --     mesh
      --     { projectionTransform = projectionTransform
      --     , viewTransform = viewTransform
      --     , modelTransform = modelTransform
      --     , light = lightFromAbove
      --     }
      WebGL.entityWith
        [ WebGL.Settings.DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.back
        ]
        railVertexShader
        railFragmentShader
        mesh
        { projectionTransform = projectionTransform
        , viewTransform = viewTransform
        , modelTransform = modelTransform
        , light = lightFromAbove
        }
    ]


showPiers : MeshLoader.Model -> List PierPlacement -> Mat4 -> List Entity
showPiers meshes piers transform =
    List.map
        (\pierPlacement ->
            showPier
                Mat4.identity
                -- identityはOCで MとVを計算することにしたので、ここがいらなくなったので仮で置いている。取り除いていい
                transform
                (MeshLoader.getPierMesh meshes pierPlacement.pier)
                pierPlacement.position
                pierPlacement.angle
        )
        piers


showPier : Mat4 -> Mat4 -> Mesh -> Vec3 -> Float -> Entity
showPier projectionTransform viewTransform mesh origin angle =
    let
        modelTransform =
            makeMeshMatrix origin angle
    in
    WebGL.entityWith
        [ WebGL.Settings.DepthTest.default
        , WebGL.Settings.cullFace WebGL.Settings.front
        ]
        pierVertexShader
        pierFragmentShader
        mesh
        { projectionTransform = projectionTransform
        , viewTransform = viewTransform
        , modelTransform = modelTransform
        , light = lightFromAbove
        }


makeMeshMatrix : Vec3 -> Float -> Mat4
makeMeshMatrix origin angle =
    let
        position =
            Mat4.makeTranslate origin

        rotate =
            Mat4.makeRotate angle (vec3 0 1 0)
    in
    Mat4.mul position rotate


type alias Uniforms =
    { modelTransform : Mat4
    , viewTransform : Mat4
    , projectionTransform : Mat4
    , light : Vec3
    }


type alias OutlineUniforms =
    { modelTransform : Mat4
    , viewTransform : Mat4
    , projectionTransform : Mat4
    , scalingFactor : Float
    , light : Vec3
    , color : Vec4
    }


railVertexShader : Shader SV.VertexWithScalingVector Uniforms { edge : Float, color : Vec3 }
railVertexShader =
    -- シェーダ周り、というか描画周りはモジュールに分けてしまいたい
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec3 scalingVector;
        
        uniform mat4 modelTransform;
        uniform mat4 viewTransform;
        uniform mat4 projectionTransform;
        uniform vec3 light;
        
        varying highp float edge;
        varying highp vec3 color;

        void main() {
            highp vec4 worldPosition = modelTransform * vec4(position, 1.0);
            highp vec4 worldNormal = normalize(modelTransform * vec4(normal, 0.0));

            // blue to green ratio. 0 <--- blue   green ---> 1.0
            highp float ratio = clamp(worldPosition[1] / 660.0, 0.0, 1.0);

            const highp vec3 blue = vec3(0.12, 0.56, 1.0);
            const highp vec3 green = vec3(0.12, 1.0, 0.56);

            highp float lambertFactor = dot(worldNormal, vec4(light, 0));
            highp float intensity = 0.3 + 0.7 * lambertFactor;
            color = intensity * (ratio * green + (1.0 - ratio) * blue);

            edge = distance(vec3(0.0, 0.0, 0.0), position);

            gl_Position = projectionTransform * viewTransform * worldPosition;
        }
    |]


railFragmentShader : Shader {} Uniforms { edge : Float, color : Vec3 }
railFragmentShader =
    [glsl|
        varying highp float edge;
        varying highp vec3 color;

        void main() {
            highp float dist_density = min(edge / 30.0 + 0.2, 1.0);
            gl_FragColor = vec4(color, dist_density);
        }
    |]


outlineVertexShader : Shader SV.VertexWithScalingVector OutlineUniforms { vertexColor : Vec4 }
outlineVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec3 scalingVector;
        
        uniform mat4 modelTransform;
        uniform mat4 viewTransform;
        uniform mat4 projectionTransform;
        uniform highp float scalingFactor;
        uniform highp vec4 color;
        uniform highp vec3 light;

        varying highp vec4 vertexColor;


        void main() {
            highp vec4 worldPosition = modelTransform * vec4(position + scalingFactor * scalingVector, 1.0);
            highp vec4 worldNormal = normalize(modelTransform * vec4(normal, 0.0));

            highp float lambertFactor = dot(worldNormal, vec4(light, 0));
            highp float intensity = 0.3 + 0.7 * lambertFactor;
            vertexColor = intensity * color;

            gl_Position = projectionTransform * viewTransform * worldPosition;
        }
    |]


outlineFragmentShader : Shader {} OutlineUniforms { vertexColor : Vec4 }
outlineFragmentShader =
    [glsl|
        varying highp vec4 vertexColor;
        void main() {
            gl_FragColor = vertexColor;
        }
    |]


pierVertexShader : Shader SV.VertexWithScalingVector Uniforms { color : Vec3 }
pierVertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec3 scalingVector;
        
        uniform mat4 modelTransform;
        uniform mat4 viewTransform;
        uniform mat4 projectionTransform;
        uniform vec3 light;

        varying highp vec3 color;

        void main() {
            highp vec4 worldPosition = modelTransform * vec4(position, 1.0);
            highp vec4 worldNormal = normalize(modelTransform * vec4(normal, 0.0));

            const highp vec3 yellow = vec3(1.0, 1.0, 0.3);
            highp float lambertFactor = dot(worldNormal, vec4(light, 0));
            highp float intensity = 0.7 + 0.3 * lambertFactor;
            color = intensity * yellow;

            gl_Position = projectionTransform * viewTransform * worldPosition;
        }
    |]


pierFragmentShader : Shader {} Uniforms { color : Vec3 }
pierFragmentShader =
    [glsl|
        varying highp vec3 color;

        void main() {
            gl_FragColor = vec4(color, 1.0);
        }
    |]
