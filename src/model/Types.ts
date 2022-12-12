class ProductCategoryType {
  id: number;
  name: string;
  parent_id: number;
  constructor(name: string, parent_id: number) {
    this.id = 1;
    this.name = name;
    this.parent_id = parent_id;
  }
}

class MaterialType {
  id: number;
  name: string;
  constructor(name: string) {
    this.id = 1;
    this.name = name;
  }
}

class JobType {
  id: number;
  name: string;
  constructor(name: string) {
    this.id = 1;
    this.name = name;
  }
}

class Size {
  id: number;
  name: string;
  constructor(name: string) {
    this.id = 1;
    this.name = name;
  }
}

class Color {
  id: number;
  name: string;
  constructor(name: string) {
    this.id = 1;
    this.name = name;
  }
}

export { ProductCategoryType, MaterialType, JobType, Size, Color };
