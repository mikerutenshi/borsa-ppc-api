import LabourCost from '../../../model/LabourCost';
import LabourCostRepository from '../../contract/LabourCostRepository';
import DeleteUseCase from '../DeleteUseCase';
export default class DeleteLabourCost extends DeleteUseCase<LabourCost> {
  constructor(repository: LabourCostRepository) {
    super(repository);
  }
}
