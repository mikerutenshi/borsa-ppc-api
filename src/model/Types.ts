import { BaseModel } from './BaseModel';

class Type extends BaseModel {
  name: string;

  constructor(name: string, className: string) {
    super(className);
    this.name = name;
  }
}

class ProductCategoryType extends Type {
  parent_id: number;
  constructor(name: string, parent_id: number) {
    super(name, 'Product Category Type');
    this.parent_id = parent_id;
  }
}

class MaterialType extends Type {
  constructor(name: string) {
    super(name, 'Material Type');
  }
}

class JobType extends Type {
  constructor(name: string) {
    super(name, 'Job Type');
  }
}

class Size extends Type {
  constructor(name: string) {
    super(name, 'Size');
  }
}

class Color extends Type {
  constructor(name: string) {
    super(name, 'Color');
  }
}

export { Type, ProductCategoryType, MaterialType, JobType, Size, Color };
