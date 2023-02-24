import { Material } from '../../../model/Materials';
import MaterialRepository from '../../contract/MaterialRepository';
import GetManyUseCase from '../GetManyUseCase';

export default class GetMaterials extends GetManyUseCase<Material> {
  constructor(repository: MaterialRepository) {
    super(repository);
  }
}
