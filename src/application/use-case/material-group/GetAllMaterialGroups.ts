import { MaterialGroup } from '../../../model/Materials';
import MaterialGroupRepository from '../../contract/MaterialGroupRepository';
import GetAllUseCase from '../GetAllUseCase';

export default class GetAllMaterialGroups extends GetAllUseCase<MaterialGroup> {
  constructor(repository: MaterialGroupRepository) {
    super(repository);
  }
}
