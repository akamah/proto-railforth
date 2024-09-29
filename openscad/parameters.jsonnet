// parameters.json を生成するやつ

local rails = {
  cannot_flip_cannot_invert: [
    'auto_point',
    'auto_turnout',
    'auto_cross',
    'slope_curve_A',
    'slope_curve_B',
    'uturn',
    'wide_cross',
    'pier_single',
    'pier_double',
    'pier_mini',

    'shadow', // for tinkering
  ],
  cannot_flip_can_invert: [
    'straight1',
    'straight2',
    'straight4',
    'straight8',
    'joint',
    'stop',
    'forward',
    'backward',
  ],
  can_flip_cannot_invert: [
    'oneway',
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
    'shift',
  ],
};

local gen_name(rail, flip, invert) =
  rail + (if invert then '_plus' else '') + (if flip then '_flip' else '');

local gen_value(rail, flip, invert) = {
  name: rail,
  flipped: flip,
  inverted: invert,
  resolution: 8,
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
