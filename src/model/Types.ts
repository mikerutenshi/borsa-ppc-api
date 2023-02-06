import { BaseModel } from './BaseModel';

class Type extends BaseModel {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

class ProductCategoryType extends Type {
  parent_id: number | null;
  constructor(name: string, parent_id: number | null) {
    super(name);
    this.parent_id = parent_id;
  }
}

class MaterialType extends Type {
  constructor(name: string) {
    super(name);
  }
}

class JobType extends Type {
  constructor(name: string) {
    super(name);
  }
}

class Size extends Type {
  constructor(name: string) {
    super(name);
  }
}

class Color extends Type {
  constructor(name: string) {
    super(name);
  }
}

class JobStatus extends Type {
  constructor(name: string) {
    super(name);
  }
}

export {
  Type,
  ProductCategoryType,
  MaterialType,
  JobType,
  Size,
  Color,
  JobStatus,
};
