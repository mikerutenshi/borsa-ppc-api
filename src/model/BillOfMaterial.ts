import { BaseModel } from './BaseModel';

class BillOfMaterial extends BaseModel {
  product_id: number;
  material_id: number;
  qty_req: number;
  constructor(product_id: number, material_id: number, qty_req: number) {
    super('bill_of_material', ['product_id', 'material_id']);
    this.product_id = product_id;
    this.material_id = material_id;
    this.qty_req = qty_req;
  }
}

export default BillOfMaterial;
