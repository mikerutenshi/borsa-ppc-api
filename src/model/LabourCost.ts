class LabourCost {
  product_group_id: number;
  job_type_id: number;
  cost: number;

  constructor(product_group_id: number, job_type_id: number, cost: number) {
    this.product_group_id = product_group_id;
    this.job_type_id = job_type_id;
    this.cost = cost;
  }
}

export default LabourCost;
