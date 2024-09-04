/*
プラレールのレール、どう作っていこうね。

## 曲線の類
なんらかの関数に沿って線路を曲げながら作る、みたいなのを実装したい気持ち

## 分岐レールの類
複数のレールをブーリアン演算で合成すればよさそう。
その際に、レール本体と窪みの部分で分けて持っておく必要はありそう

## 飾りのついたレールの類（自動ターンアウトレールなど）
飾り部分をがっちゃんこする

## 管理
レール1つあたり1ファイル書き出せるようになっていればいい。
数十の.scadファイルを作成するのとCustomizer paramet を濫用するのとどっちがいいか考えたところ、
パラメータにしようかなと思うなどしました。

*/

/*
配列で与えられた線に沿って2D図形を押し出し、3D図形に変化させる。
動作としては、X軸方向に向かって押し出しを行う。その際、元のY軸に高さをつける（= Z軸方向への操作)ことをしない。
すなわち、線路にカントはつかない。

テンプレートとなる2D図形に関しては、YZ平面に垂直なことが望ましいが、絶対ではないと思う。あと、X軸マイナス方向から見て時計回りにしてほしい。

@param path : a list of [x, y, z]. The length must be >= 2.
@param tang : a list of [dx, dy, dz]. The length must be same as path. The tangent vector of path
@param poly : a list of [px, py, pz], the polygon to be extruded.

*/

module rail_extrude(path, tang, poly) {
    faces = [
        // 頭の部分
        for (i = [1:len(poly)-2]) [0, i, i+1],
    
        for (i = [0:len(path) - 2]) // 多角形の間を縫うので -2 する
            for (j = [0:len(poly) - 1])
                each [
                    [ i * len(poly) + j
                    , (i+1) * len(poly) + j
                    , (i+1) * len(poly) + (j+1) % len(poly)
                    ],
                    [ (i+1) * len(poly) + (j+1) % len(poly)
                    , i * len(poly) + (j+1) % len(poly)
                    , i * len(poly) + j
                    ],
                ]
        ,
        // 末尾の部分。頭が時計回りなので逆向きにする
        for (i = [1:len(poly)-2])
           let(last = len(poly) * len(path) - 1)
              [last, last - i, last - i - 1]
    ];
        
    points = [
        for (i = [0:len(path)-1])
            let (trans = rotation_matrix(path[i], tang[i]))
                for (point = poly)
                    let (res = trans * [point.x, point.y, point.z, 1]) // 接ベクトルから作った回転行列で周辺を曲げる
                        [res.x, res.y, res.z]
    ];
    
//    echo(points);
//    echo(faces);
    polyhedron(points=points, faces=faces, convexity=10);
}

/*
導出についてメモすると、単位接ベクトル x' みたいなものを考えて、
(1, 0, 0) を x' に写すような線型写像を構成すればいい。
その際、Z軸でA,元々のY軸でBの回転をさせると考えれば、回転行列は以下のようになる。

cosA*cosB, -sinA, -cosA*cosB
sinA*cosB, cosA, -sinA*sinB
sinB     , 0,    cosB

あと、おまけに点p方向に移動させる。そうするとアフィン変換として扱えて楽なので。

@param p    移動方向。
@param tang 接ベクトル。単位長さではなくていい。ただ、z成分が1にとても近いとダメになる。

*/
function rotation_matrix(p, tang) =
    let(x  = tang / norm(tang),
        zz = sqrt(1 - x.z*x.z),
        yx = -x.y / zz,
        yy =  x.x / zz,
        zx = -yy * x.z,
        zy =  yx * x.z)
        [
            [x.x, yx, zx, p.x],
            [x.y, yy, zy, p.y],
            [x.z, 0,  zz, p.z],
            [0,   0,  0,  1],
        ];


module rail_extrude_test() {
    rail_extrude(path=[[0, 0, 0], [10, 0, 0], [10, 10, 0]],
                 tang=[[1, 0, 0], [1, 1, 0], [0, 1, 0]],
                 poly=[[0, 1, 0], [0, 0, 1], [0, -1, 0], [0, 0, -1]]);
}    

// 点の列と接ベクトルの列を合わせてレールの定義と呼ぶことにする。
// 基本的なレール定義をこの辺に書いていく。

function straight_raildef(length) =
    [[ for (i = [0:1]) length * [i / 1, 0, 0] ]
    ,[ for (i = [0:1]) [1, 0, 0] ]
    ];

function curve_raildef(radius, degrees, height, div) =
    [[ for (i = [0:div]) [radius * sin(degrees * i / div), radius * (1 - cos(degrees * i / div)), height * (1 - cos(180 * i/div)) / 2] ]
    ,[ for (i = [0:div]) [radius * degrees * cos(degrees * i / div), radius * degrees * sin(degrees * i / div), height * 180 * sin(180 * i/div) / 2] ]
    ];

function slope_raildef(length, height, div) =
    [[ for (i = [0:div]) [length * i/div, 0, height * (1 - cos(180 * i/div)) / 2] ]
    ,[ for (i = [0:div]) [length, 0, height * PI * sin(180 * i/div) / 2] ]
    ];

function shift_raildef(length, slide, div) = 
    [[ for (i = [0:div]) [length * i/div, slide * (1 - cos(180 * i/div)) / 2, 0] ]
    ,[ for (i = [0:div]) [length, slide * PI * sin(180 * i/div) / 2, 0] ]
    ];
 
function uturn_raildef(length, radius, width, div) =
    let (p = length - radius / sqrt(2), // レールの最初の方の曲がり方を楕円として考えた時、傾きが-1になるx
         q = radius / sqrt(2) - width / 2, // 同じくy
         a = (p - q) * sqrt(p / (p - 2 * q)), // 楕円の長径
         b = q * (p - q) / (p - 2 * q), // 短径
         tmax = acos(q / (p - q)) // (p, q) の位置に楕円が達する時の、y軸から見た楕円での角度
    )
        [[ for (i = [0:div])
             i/div < 1/8 ?
                // 最初は楕円を描く。上の計算により、長径a, 短径b の楕円を (0, -b) を中心として描く
                [ a * sin(tmax * 8 * i/div), b * cos(tmax * 8 * i/div) - b, 0] :
             i/div < 7/8 ?
                // 1/8 から 7/8 までは (length + radius, width / 2) を中心とした円を描く
                [length + radius * cos(360 * (i/div - 1/2)), width / 2 + radius * sin(360 * (i/div - 1/2)), 0]
             :  // 最後も楕円となる。最初と同じ形の楕円を (0, b + width) の位置に描く
                [ a * sin(tmax * 8 * (div-i)/div), -b * cos(tmax * 8 * (div-i)/div) + b + width, 0]]
        
        ,[ for (i = [0:div])
             i/div < 1/8 ?
                [ a * cos(tmax * 8 * i/div), -b * sin(tmax * 8 * i/div), 0] :
             i/div < 7/8 ?
                [-sin(360 * (i/div - 1/2)), cos(360 * (i/div - 1/2)), 0]
             :
                [ -a * cos(tmax * 8 * (div-i)/div), -b * sin(tmax * 8 * (div-i)/div), 0]]
        ];
    
function translate_raildef(trans, raildef) =
    [ [ for (p = raildef[0]) p + trans ], raildef[1] ];

function flip_raildef(raildef) =
    [ [ for (p = raildef[0]) [p.x, -p.y, -p.z] ]
    , [ for (t = raildef[1]) [t.x, -t.y, -t.z] ]
    ];

function flip_if(flipped, raildef) =
    flipped ? flip_raildef(raildef) : raildef;

// レールの始点における外側へのアフィン変換を得る。
function start_mat(raildef) =
    rotation_matrix(raildef[0][0], -raildef[1][0]);

// レールの終点における外側へのアフィン変換を得る    
function end_mat(raildef) =
    rotation_matrix(raildef[0][len(raildef[0])-1], raildef[1][len(raildef[1])-1]);



// レールの定義に沿って描画する関数たち

function generate_square_polygon(depth, height, center) = 
    [ [0, depth/2, height/2] + center
    , [0, -depth/2, height/2] + center
    , [0, -depth/2, -height/2] + center
    , [0, depth/2, -height/2] + center
    ];

// レールの幅
WIDTH  = 38;

// 厚み
THICKNESS = 8;

module render_rail_body(raildef) {
    body_polygon = generate_square_polygon(WIDTH, THICKNESS, [0, 0, THICKNESS/2]);
    rail_extrude(raildef[0], raildef[1], body_polygon);
}

module render_grooves(raildef) {
    groove_width = 8.0;
    groove_depth = 6.0;
    groove_width_center = 13.5;
    groove_depth_center = THICKNESS;
    
    for (scaleY = [-1, 1]) {
        poly = generate_square_polygon(groove_width, groove_depth, [0, scaleY * groove_width_center, groove_depth_center]);
        rail_extrude(raildef[0], raildef[1], poly);
    }
}

// @param raildefs raildef のリスト。描画される。
// @param jacks ジャックを配置する回転行列のリスト
// @param plugs プラグを配置する回転行列のリスト
// @param inverted ジャックとプラグを逆にするかどうかのオプション。あったら便利よね
module render_rail(raildefs, jacks, plugs, inverted) {
    union() {
        difference() {
            union() {
                for (raildef = raildefs) {
                    render_rail_body(raildef);
                }
            }
            
            for (raildef = raildefs) {
                render_grooves(raildef);
            }

            for (mat = concat(jacks, plugs)) {
               multmatrix(mat) {
                    rasp();
               }
            }
            
            for (mat = inverted ? plugs : jacks) {
                multmatrix(mat) {
                    render_joint_jack();
                }
            }
        }
        
        for (mat = inverted ? jacks : plugs) {
            multmatrix(mat) {
                render_joint_plug();
            }
        }
    }
}

module render_joint_jack() {
    translate([-4.5, 0, THICKNESS/2]) {
        cube([10.0, 12.0, THICKNESS + 2.0], center = true);
    }
}

module render_joint_plug() {
    translate([4.0, 0, THICKNESS/2]) {
        cube([9.0, 11.0, THICKNESS], center = true);
    }
}

// 線路の先端、終端を削り取るためのもの。
// 溝を掘ると終端にバリが出ることがあるのでそれの処理のためと、
// 線路をつなげた際にぴっちりしないようにするために使う。
module rasp() {
    translate([0, 0, THICKNESS/2]) {
        cube([1.0, WIDTH + 1.0, THICKNESS + 1.0], center = true);
    }
}

// 補助関数。直線や曲線などの簡単なレールを楽に定義するためのもの
module render_simple_rail(raildef, inverted) {
    render_rail([raildef], [start_mat(raildef)], [end_mat(raildef)], inverted);
}

// =========================== 実際のレールの定義など =======================

// 直線レール1/4本分の長さ。単位はミリ
UNIT = 54;

// 複線の間隔
DOUBLE_TRACK = 60;

// 橋脚の1/4の高さ。
PIER_UNIT = 16.5;

module straight(length, inverted) {
    render_simple_rail(straight_raildef(length * UNIT), inverted);
}

module curve(degree, flipped, inverted, divs) {
    render_simple_rail(flip_if(flipped, curve_raildef(4 * UNIT, degree, 0, divs)), inverted);    
}

module outer_curve(degree, flipped, inverted, divs) {
    render_simple_rail(flip_if(flipped, curve_raildef(4 * UNIT + DOUBLE_TRACK, degree, 0, divs)), inverted);    
}

module turnout(flipped, inverted, divs) {
    straight = straight_raildef(4 * UNIT);
    curve = flip_if(flipped, curve_raildef(4 * UNIT, 45, 0, divs));
    render_rail([straight, curve], [start_mat(straight)], [end_mat(straight), end_mat(curve)], inverted);
}

module single_double(flipped, inverted, divs) {
    straight = straight_raildef(4 * UNIT);
    shift = flip_if(flipped, shift_raildef(4 * UNIT, DOUBLE_TRACK, divs));
    render_rail([straight, shift], [start_mat(straight)], [end_mat(straight), end_mat(shift)], inverted);
}

module uturn(div) {
    uturn = uturn_raildef(UNIT * 5, UNIT * 5/2, DOUBLE_TRACK, div);
    render_rail([uturn], [start_mat(uturn), end_mat(uturn)], [], false);
}

module joint(inverted) {
    straight = straight_raildef(UNIT);
    render_rail([straight], [start_mat(straight), end_mat(straight)], [], inverted);
}

module eight(flipped, inverted, divs) {
    right = flip_if(flipped, curve_raildef(4 * UNIT, 45, 0, divs));
    left = flip_if(!flipped, curve_raildef(4 * UNIT, 45, 0, divs));
    render_rail([right, left], [start_mat(right), end_mat(left)], [end_mat(right)], inverted);
}

module double_wide(flipped, inverted, divs) {
    straight = straight_raildef(5 * UNIT);
    shift = flip_if(flipped, shift_raildef(5 * UNIT, 2 * UNIT, divs));
    next_track = flip_if(flipped, translate_raildef([0, DOUBLE_TRACK, 0], shift_raildef(5 * UNIT, 2 * UNIT - DOUBLE_TRACK, divs)));
    render_rail([straight, shift, next_track], [start_mat(straight), end_mat(straight), start_mat(next_track)], [end_mat(next_track)], inverted);
}

module shift(flipped, inverted, divs) {
    render_simple_rail(flip_if(flipped, shift_raildef(4 * UNIT, DOUBLE_TRACK, divs)), inverted);    
}

module slope(flipped, inverted, divs) {
    render_simple_rail(flip_if(flipped, slope_raildef(8 * UNIT, 4 * PIER_UNIT, divs)), inverted);    
}

module auto_turnout(divs) {
    straight = straight_raildef(6 * UNIT);
    curve = translate_raildef([2 * UNIT, 0, 0], curve_raildef(4 * UNIT, 45, 0, divs));
    render_rail([straight, curve], [start_mat(straight)], [end_mat(straight), end_mat(curve)], false);
}

module auto_point(divs) {
    straight = straight_raildef(6 * UNIT);
    curve = translate_raildef([2 * UNIT, 0, 0], curve_raildef(4 * UNIT, 45, 0, divs));
    shift = translate_raildef([2 * UNIT, 0, 0], shift_raildef(4 * UNIT, -DOUBLE_TRACK, divs));
    render_rail([straight, curve, shift], [start_mat(straight)], [end_mat(straight), end_mat(curve), end_mat(shift)], false);
}

module slope_curve(flipped, inverted, divs) {
    // 反転させると下の方に行ってしまうので、あらかじめ高さを逆にしておく
    curve = flip_if(flipped, curve_raildef(4 * UNIT, 45, flipped ? -PIER_UNIT : PIER_UNIT, divs));
    union() {
        render_simple_rail(curve, inverted);

        // 一つ分うえにできちゃったので一個下げる
        translate([0, 0, -PIER_UNIT]) {
            multmatrix(end_mat(curve)) {
                pier_mini();
            }
        }
    }
}

// この種類のレールだけは逆方向がなかったりするので、それぞれ単品として扱う
module slope_curve_B(divs) {
    slope_curve(false, false, divs);
}

module slope_curve_A(divs) {
    slope_curve(true, true, divs);
}


module double_cross(inverted, divs) {
    straight = straight_raildef(4 * UNIT);
    next_track = translate_raildef([0, DOUBLE_TRACK, 0], straight);
    shift = shift_raildef(4 * UNIT, DOUBLE_TRACK, divs);
    
    render_rail(
        [
            straight,
            next_track,
            shift,
            translate_raildef([0, DOUBLE_TRACK, 0], flip_raildef(shift)),
        ],
        [start_mat(straight), start_mat(next_track)],
        [end_mat(straight), end_mat(next_track)],
        inverted
    );
}

// 橋脚。一旦は(0, 0, 0)と隅を合わせて、 x, yの正の方向に描画する
module render_pier(depth, roofWidth, pillarWidth, baseWidth, roofHeight, pillarHeight, baseHeight) {
    module pillarAndBase() {
        // 柱本体
        translate([0, 0, baseHeight]) {
            linear_extrude(height = pillarHeight) {
                polygon([
                    [0, pillarWidth / 2],
                    [depth / 2, pillarWidth],
                    [depth, pillarWidth / 2],
                    [depth / 2, 0],
                ]);
            }
        }
        // 上の角取り
        translate([0, 0, baseHeight + pillarHeight]) {
            difference() {
                rotate([-45, 0, 0]) {
                    cube([depth, pillarWidth * sqrt(1/2), pillarWidth * sqrt(1/2)]);
                }
                translate([-1, -1, 0]) {
                    cube([depth + 2, 2 * pillarWidth + 2, pillarWidth]);
                }
            }
        }
        // 下の角取り
        translate([0, 0, baseHeight]) {
            difference() {
                rotate([-45, 0, 0]) {
                    cube([depth, pillarWidth * sqrt(1/2), pillarWidth * sqrt(1/2)]);
                }
                translate([-1, -1, -pillarWidth]) {
                    cube([depth + 2, 2 * pillarWidth + 2, pillarWidth]);
                }
            }
        }

        cube([depth, baseWidth, baseHeight]);
    }

    // 天井
    translate([0, 0, baseHeight + pillarHeight]) {
        cube([depth, roofWidth, roofHeight]);
    }
    pillarAndBase();
    translate([depth, roofWidth, 0]) {
        rotate([0, 0, 180]) {
            pillarAndBase();
        }
    }
}

PIER_DEPTH = 30;
PIER_PILLAR_WIDTH = 12;
PIER_BASE_WIDTH = 23;
PIER_ROOF_HEIGHT = 6;
PIER_MARGIN = 0.5;
PIER_SPACING = 4;
PIER_BASE_HEIGHT = THICKNESS;
PIER_ROOF_WIDTH = WIDTH + 2 * PIER_SPACING + 2 * PIER_BASE_WIDTH;
PIER_PILLAR_HEIGHT = 4 * PIER_UNIT - PIER_ROOF_HEIGHT - PIER_BASE_HEIGHT - PIER_MARGIN;

// extendは単線と複線の橋脚のどちらにも対応できるようにするためのパラメータ。
// extend = 0なら単線、DOUBLE_TRACKなら複線になるようになる
module pier_base(extend) {
    translate([-PIER_DEPTH / 2, -PIER_ROOF_WIDTH / 2, 0]) {
        render_pier(
            depth = PIER_DEPTH,
            roofWidth = PIER_ROOF_WIDTH + extend,
            pillarWidth = PIER_PILLAR_WIDTH,
            baseWidth = PIER_BASE_WIDTH,
            roofHeight = PIER_ROOF_HEIGHT,
            pillarHeight = PIER_PILLAR_HEIGHT,
            baseHeight = PIER_BASE_HEIGHT
        );
    }
}

module pier_single() {
    pier_base(0);
}

module pier_double() {
    pier_base(DOUBLE_TRACK);
}

module pier_mini() {
    translate([-PIER_DEPTH/2, -PIER_ROOF_WIDTH/2, 0]) {
        cube([PIER_DEPTH, PIER_ROOF_WIDTH, PIER_UNIT - PIER_MARGIN]);
    }
}
