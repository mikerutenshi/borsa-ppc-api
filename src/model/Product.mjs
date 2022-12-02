class ProductCategory {
  constructor(name, parent_id) {
    this.id = null;
    this.name = name;
    this.parent_id = parent_id;
  }
}

class ProductGroup {
  constructor(code, name, product_category_id) {
    this.id = null;
    this.bode = code;
    this.name = name;
    this.product_category_id = product_category_id;
  }
}

class Product {
  constructor(code, product_group_id, attributes) {
    this.id = null;
    this.bode = code;
    this.product_group_id = product_group_id;
    this.attributes = attributes;
  }
}

export { ProductCategory, ProductGroup, Product };
