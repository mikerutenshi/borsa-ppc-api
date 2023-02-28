import LabourCost from '../../../model/LabourCost';
import LabourCostRepository from '../../contract/LabourCostRepository';
import GetOneUseCase from '../GetOneUseCase';

export default class GetLabourCost extends GetOneUseCase<LabourCost> {
  constructor(repository: LabourCostRepository) {
    super(repository);
  }
}
