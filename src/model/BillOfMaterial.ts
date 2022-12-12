class BillOfMaterial {
  product_id: number;
  material_id: number;
  qty_req: number;
  constructor(product_id: number, material_id: number, qty_req: number) {
    this.product_id = product_id;
    this.material_id = material_id;
    this.qty_req = qty_req;
  }
}

export default BillOfMaterial;
