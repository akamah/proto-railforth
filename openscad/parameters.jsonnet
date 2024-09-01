// parameters.json を生成するやつ

local rails = {
  cannot_flip_cannot_invert: [
    'auto_point',
    'auto_turnout',
    'uturn',
  ],
  cannot_flip_can_invert: [
    'straight1',
    'straight2',
    'straight4',
    'straight8',
    'joint',
  ],
  can_flip_cannot_invert: [
  ],
  can_flip_can_invert: [
    'curve45',
    'curve90',
    'outer_curve45',
    'turnout',
    'single_double',
    'eight',
    'joint',
    'slope',
  ],
};

local gen_name(rail, flip, invert) =
  rail + (if invert then '_plus' else '_minus') + (if flip then '_flip' else '');

local gen_value(rail, flip, invert) = {
  name: rail,
  flip: flip,
  invert: invert,
  resolution: 2,
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
