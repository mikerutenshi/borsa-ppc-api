import { MaterialGroup } from '../../../model/Materials';
import MaterialGroupRepository from '../../contract/MaterialGroupRepository';
import DeleteUseCase from '../DeleteUseCase';
export default class DeleteMaterialGroup extends DeleteUseCase<MaterialGroup> {
  constructor(repository: MaterialGroupRepository) {
    super(repository);
  }
}
