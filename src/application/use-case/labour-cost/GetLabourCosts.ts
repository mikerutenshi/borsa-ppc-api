import LabourCost from '../../../model/LabourCost';
import LabourCostRepository from '../../contract/LabourCostRepository';
import GetManyUseCase from '../GetManyUseCase';

export default class GetLabourCosts extends GetManyUseCase<LabourCost> {
  constructor(repository: LabourCostRepository) {
    super(repository);
  }
}
