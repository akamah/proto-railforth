// parameters.json を生成するやつ

local rails = {
  cannot_flip_cannot_invert: [
    'auto_point',
    'auto_turnout',
    'auto_cross',
    'slope_curve_A',
    'slope_curve_B',
    'uturn',
    'pier_single',
    'pier_double',
    'pier_mini',
  ],
  cannot_flip_can_invert: [
    'straight1',
    'straight2',
    'straight4',
    'straight8',
    'joint',
    'stop',
  ],
  can_flip_cannot_invert: [
  ],
  can_flip_can_invert: [
    'curve45',
    'curve90',
    'outer_curve45',
    'turnout',
    'single_double',
    'double_wide',
    'eight',
    'slope',
  ],
};

local gen_name(rail, flip, invert) =
  rail + (if invert then '_plus' else '') + (if flip then '_flip' else '');

local gen_value(rail, flip, invert) = {
  name: rail,
  flipped: flip,
  inverted: invert,
  resolution: 4,
};

local main() =
  {
    fileFormatVersion: '1',
    parameterSets:
      {
        [gen_name(rail, flip, invert)]: gen_value(rail, flip, invert)
        for rail in rails.cannot_flip_cannot_invert
        for invert in [false]
        for flip in [false]
      } + {
        [gen_name(rail, flip, invert)]: gen_value(rail, flip, invert)
        for rail in rails.cannot_flip_can_invert
        for invert in [false, true]
        for flip in [false]
      } + {
        [gen_name(rail, flip, invert)]: gen_value(rail, flip, invert)
        for rail in rails.can_flip_cannot_invert
        for invert in [false]
        for flip in [false, true]
      } + {
        [gen_name(rail, flip, invert)]: gen_value(rail, flip, invert)
        for rail in rails.can_flip_can_invert
        for flip in [false, true]
        for invert in [false, true]
      },
  };

main()
