import { MaterialGroup } from '../../../model/Materials';
import MaterialGroupRepository from '../../contract/MaterialGroupRepository';
import GetOneUseCase from '../GetOneUseCase';

export default class GetMaterialGroup extends GetOneUseCase<MaterialGroup> {
  constructor(repository: MaterialGroupRepository) {
    super(repository);
  }
}
