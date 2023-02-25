import { Material, MaterialGroup } from '../Materials';

const jupiter = new MaterialGroup('Jupiter', 2);
const roselle = new MaterialGroup('Roselle', 2);
const womenSole1 = new MaterialGroup('Women Outsole 1', 2);
const womenSole2 = new MaterialGroup('Women Outsole 2', 2);

const jupiterBlack = new Material(
  'Jupiter Black',
  { colors: 'black', sizes: ['38', '39', '40', '41', '42'] },
  1
);
const jupiterOlive = new Material(
  'Jupiter Olive',
  { colors: 'olive', sizes: ['38', '39', '40', '41', '42'] },
  1
);
const womenSoleBlack = new Material(
  'Women Outsole 1 Black',
  { colors: 'black', sizes: ['36', '37', '38', '40', '41'] },
  3
);
const womenSoleBrown = new Material(
  'Women Outsole 1 Brown',
  { colors: 'Brown', sizes: ['36', '37', '38', '40', '41'] },
  3
);

export {
  jupiter,
  roselle,
  womenSole1,
  womenSole2,
  jupiterBlack,
  jupiterOlive,
  womenSoleBlack,
  womenSoleBrown,
};
