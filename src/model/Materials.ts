import { BaseModel } from './BaseModel';

class MaterialGroup extends BaseModel {
  name: string;
  material_type_id: number;
  constructor(name: string, materialTypeId: number) {
    super('material_group', ['name']);
    this.name = name;
    this.material_type_id = materialTypeId;
  }
}

class Material extends BaseModel {
  name: string;
  attributes: object;
  material_group_id: number;

  constructor(name: string, attributes: object, materialGroupId: number) {
    super('material', ['name']);
    this.name = name;
    this.attributes = attributes;
    this.material_group_id = materialGroupId;
  }
}

export { MaterialGroup, Material };
