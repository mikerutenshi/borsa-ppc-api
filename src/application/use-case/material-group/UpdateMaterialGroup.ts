import { MaterialGroup } from '../../../model/Materials';
import MaterialGroupRepository from '../../contract/MaterialGroupRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateMaterialGroup extends UpdateUseCase<MaterialGroup> {
  constructor(repository: MaterialGroupRepository) {
    super(repository);
  }
}
