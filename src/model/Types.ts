import { BaseModel } from './BaseModel';

class Type extends BaseModel {
  name: string;

  constructor(name: string, table: string) {
    super(table, 'name', name);
    this.name = name;
  }
}

class ProductCategoryType extends Type {
  parent_id: number;
  constructor(name: string, parent_id: number) {
    super(name, 'product_category_type');
    this.parent_id = parent_id;
  }
}

class MaterialType extends Type {
  constructor(name: string) {
    super(name, 'material_type');
  }
}

class JobType extends Type {
  constructor(name: string) {
    super(name, 'job_type');
  }
}

class Size extends Type {
  constructor(name: string) {
    super(name, 'size');
  }
}

class Color extends Type {
  constructor(name: string) {
    super(name, 'color');
  }
}

export { Type, ProductCategoryType, MaterialType, JobType, Size, Color };
