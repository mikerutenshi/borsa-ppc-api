class MaterialGroup {
  id: number;
  name: string;
  parent_id: number;
  constructor(name: string, parent_id: number) {
    this.id = 1;
    this.name = name;
    this.parent_id = parent_id;
  }
}

class Material {
  id: number;
  name: string;
  attributes: object;

  constructor(name: string, attributes: object) {
    this.id = 1;
    this.name = name;
    this.attributes = attributes;
  }
}

export { MaterialGroup, Material };
