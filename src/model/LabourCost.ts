import { BaseModel } from './BaseModel';

class LabourCost extends BaseModel {
  product_group_id: number;
  job_type_id: number;
  cost: number;

  constructor(product_group_id: number, job_type_id: number, cost: number) {
    super('labour_cost', ['product_group_id', 'job_type_id']);
    this.product_group_id = product_group_id;
    this.job_type_id = job_type_id;
    this.cost = cost;
  }
}

export default LabourCost;
