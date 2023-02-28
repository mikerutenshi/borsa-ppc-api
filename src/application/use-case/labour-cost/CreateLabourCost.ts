import LabourCost from '../../../model/LabourCost';
import LabourCostRepository from '../../contract/LabourCostRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateLabourCost extends CreateUseCase<LabourCost> {
  constructor(repository: LabourCostRepository) {
    super(repository);
  }
}
