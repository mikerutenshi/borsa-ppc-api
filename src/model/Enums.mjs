class ProductCategoryType {
  constructor(name, parent_id) {
    this.id = null;
    this.name = name;
    this.parent_id = parent_id;
  }
}

class MaterialType {
  constructor(name) {
    this.id = null;
    this.name = name;
  }
}

class JobType {
  constructor(name) {
    this.id = null;
    this.name = name;
  }
}

class Size {
  constructor(name) {
    this.id = null;
    this.name = name;
  }
}

class Color {
  constructor(name) {
    this.id = null;
    this.name = name;
  }
}

export { ProductCategoryType, MaterialType, JobType, Size, Color };
