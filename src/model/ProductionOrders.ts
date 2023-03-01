import { BaseModel } from './BaseModel';

export class ProductionOrder extends BaseModel {
  code: string;
  constructor(code: string) {
    super('production_order', ['code']);
    this.code = code;
  }
}

export class ProductionOrderDetail extends BaseModel {
  production_order_id: number;
  size_id: number;
  quantity: number;
  constructor(productionOrderId: number, sizeId: number, quantity: number) {
    super('production_order_detail', ['production_order_id', 'size_id']);
    this.production_order_id = productionOrderId;
    this.size_id = sizeId;
    this.quantity = quantity;
  }
}
