import { BaseModel } from './BaseModel';

class MaterialGroup extends BaseModel {
  name: string;
  parent_id: number;
  constructor(name: string, parent_id: number) {
    super('material_group', ['name']);
    this.name = name;
    this.parent_id = parent_id;
  }
}

class Material extends BaseModel {
  name: string;
  attributes: object;

  constructor(name: string, attributes: object) {
    super('material', ['name']);
    this.name = name;
    this.attributes = attributes;
  }
}

export { MaterialGroup, Material };
