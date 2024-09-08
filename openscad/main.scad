/*
全てのレールのエントリーポイント。
name, flipped, invertedがcustomizer parameterとして与えられて切り替える。

出力ファイル・パラメータセット名の命名規則についても考えておくか...
いや、考えるのも大変なので現状のやつでいこう。

${name}_${plus/minus}_${flipped}

resolutionについて:
円弧や曲がる系のレールの分割幅も外部から渡せるほうがいいけれど、個別に設定するのは面倒、
ということでそれぞれのレールにデフォルトの割合を持たせておいて、resolution を 2にするとそれの2倍にする、
みたいな風にしようと思う。

45度曲がる曲線は resolution = 1 なら divs = 4にする。すなわち、360度なら 32みたいな。
OpenSCADにも $fn みたいな変数はあるけれど、やや煩雑なので利用しないことにした。

複線幅のシフトをするようなものも、resolution = 1 => divs = 4 になるようにした。
理由はポリゴン感がおおむね近くなるため。

*/
use <rail.scad>

name = "";
flipped = false;
inverted = false;
resolution = 4;

echo([name, flipped, inverted, resolution]);

module assert_cannot_flip(name, flipped) {
  assert(flipped == false, str(name, " cannot be flipped"));
}

module assert_cannot_invert(name, inverted) {
  assert(inverted == false, str(name, " cannot be inverted"));
}

if (name == "straight1") {
  assert_cannot_flip(name, flipped);
  straight(1, inverted);
} else if (name == "straight2") {
  assert_cannot_flip(name, flipped);
  straight(2, inverted);
} else if (name == "straight4") {
  assert_cannot_flip(name, flipped);
  straight(4, inverted);
} else if (name == "straight8") {
  assert_cannot_flip(name, flipped);
  straight(8, inverted);
} else if (name == "curve45") {
  curve(45, flipped, inverted, 1 * resolution);
} else if (name == "curve90") {
  curve(90, flipped, inverted, 2 * resolution);
} else if (name == "outer_curve45") {
  outer_curve(45, flipped, inverted, 1 * resolution);
} else if (name == "turnout") {
  turnout(flipped, inverted, 1 * resolution);
} else if (name == "single_double") {
  single_double(flipped, inverted, 1 * resolution);
} else if (name == "double_wide") {
  double_wide(flipped, inverted, 1 * resolution);
} else if (name == "eight") {
  eight(flipped, inverted, 1 * resolution);
} else if (name == "joint") {
  assert_cannot_flip(name, flipped);
  joint(inverted);
} else if (name == "slope") {
  slope(flipped, inverted, 1 * resolution);
} else if (name == "slope_curve_A") {
  assert_cannot_flip(name, flipped);
  assert_cannot_invert(name, inverted);
  slope_curve_A(1 * resolution);
} else if (name == "slope_curve_B") {
  assert_cannot_flip(name, flipped);
  assert_cannot_invert(name, inverted);
  slope_curve_B(1 * resolution);
} else if (name == "auto_turnout") {
  assert_cannot_flip(name, flipped);
  assert_cannot_invert(name, inverted);
  auto_turnout(1 * resolution);
} else if (name == "auto_point") {
  assert_cannot_flip(name, flipped);
  assert_cannot_invert(name, inverted);
  auto_point(1 * resolution);
} else if (name == "shift") {
  shift(flipped, inverted, 1 * resolution);
} else if (name == "stop") {
  assert_cannot_flip(name, flipped);
  stop(flipped);
} else if (name == "uturn") {
  assert_cannot_flip(name, flipped);
  assert_cannot_invert(name, inverted);
  uturn(8 * resolution);
} else if (name == "auto_cross") {
  assert_cannot_flip(name, flipped);
  assert_cannot_invert(name, inverted);
  auto_cross(1 * resolution);
} else if (name == "oneway") {
  assert_cannot_invert(name, inverted);
  turnout(flipped, true, 1 * resolution);
} else if (name == "wide_cross") {
  assert_cannot_flip(name, flipped);
  assert_cannot_invert(name, inverted);
  wide_cross(1 * resolution);
} else if (name == "forward") {
  assert_cannot_flip(name, flipped);
  straight(2, inverted);
} else if (name == "backward") {
  assert_cannot_flip(name, flipped);
  straight(2, inverted);
} else if (name == "pier_single") {
  assert_cannot_flip(name, flipped);
  assert_cannot_invert(name, inverted);
  pier_single();
} else if (name == "pier_double") {
  assert_cannot_flip(name, flipped);
  assert_cannot_invert(name, inverted);
  pier_double();
} else if (name == "pier_mini") {
  assert_cannot_flip(name, flipped);
  assert_cannot_invert(name, inverted);
  pier_mini();
} else {
  assert(false, str(name, " is not a valid rail name"));
}
