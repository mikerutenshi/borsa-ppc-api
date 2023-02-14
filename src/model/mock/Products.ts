import { Product, ProductGroup } from '../Products';

const moccasinGroup = new ProductGroup('11501', 'Americano', 3);
const blackMoccasin = new Product('M11501-bk', 1, {
  colors: ['black'],
  sizes: ['39', '40', '41', '42', '42', '43.5'],
});
const whiteMoccasin = new Product('M11501-wh', 1, {
  colors: ['white', 'brown'],
  sizes: ['40', '41', '42', '42'],
});

export { moccasinGroup, blackMoccasin, whiteMoccasin };
