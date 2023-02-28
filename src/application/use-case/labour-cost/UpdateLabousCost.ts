import LabourCost from '../../../model/LabourCost';
import LabourCostRepository from '../../contract/LabourCostRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateLabourCost extends UpdateUseCase<LabourCost> {
  constructor(repository: LabourCostRepository) {
    super(repository);
  }
}
