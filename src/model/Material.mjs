class MaterialGroup {
  constructor(name, parent_id) {
    this.id = null;
    this.name = name;
    this.parent_id = parent_id;
  }
}

class Material {
  constructor(name, attributes) {
    this.id = null;
    this.name = name;
    this.attributes = attributes;
  }
}

export { MaterialGroup, Material };
