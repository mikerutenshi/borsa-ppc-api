import LabourCost from '../../../model/LabourCost';
import LabourCostRepository from '../../contract/LabourCostRepository';
import GetAllUseCase from '../GetAllUseCase';

export default class GetAllLabourCosts extends GetAllUseCase<LabourCost> {
  constructor(repository: LabourCostRepository) {
    super(repository);
  }
}
