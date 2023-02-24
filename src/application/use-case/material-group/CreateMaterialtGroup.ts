import { MaterialGroup } from '../../../model/Materials';
import MaterialGroupRepository from '../../contract/MaterialGroupRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateMaterialGroup extends CreateUseCase<MaterialGroup> {
  constructor(repository: MaterialGroupRepository) {
    super(repository);
  }
}
