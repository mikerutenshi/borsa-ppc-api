import { Material } from '../../../model/Materials';
import MaterialRepository from '../../contract/MaterialRepository';
import GetAllUseCase from '../GetAllUseCase';

export default class GetAllMaterials extends GetAllUseCase<Material> {
  constructor(repository: MaterialRepository) {
    super(repository);
  }
}
