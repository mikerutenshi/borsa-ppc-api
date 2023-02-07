class ProductCategory {
  id: number;
  name: string;
  parent_id: number | null;
  product_category_type_id: number;

  constructor(
    name: string,
    parent_id: number | null,
    product_category_type_id: number
  ) {
    this.id = 1;
    this.name = name;
    this.parent_id = parent_id;
    this.product_category_type_id = product_category_type_id;
  }
}

class ProductGroup {
  id: number;
  code: string;
  name: string;
  product_category_id: number;

  constructor(code: string, name: string, product_category_id: number) {
    this.id = 1;
    this.code = code;
    this.name = name;
    this.product_category_id = product_category_id;
  }
}

class Product {
  id: number;
  code: string;
  product_group_id: number;
  attributes: object;

  constructor(code: string, product_group_id: number, attributes: object) {
    this.id = 1;
    this.code = code;
    this.product_group_id = product_group_id;
    this.attributes = attributes;
  }
}

export { ProductCategory, ProductGroup, Product };
