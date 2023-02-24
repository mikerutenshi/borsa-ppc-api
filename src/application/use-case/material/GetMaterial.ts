import { Material } from '../../../model/Materials';
import MaterialRepository from '../../contract/MaterialRepository';
import GetOneUseCase from '../GetOneUseCase';

export default class GetMaterial extends GetOneUseCase<Material> {
  constructor(repository: MaterialRepository) {
    super(repository);
  }
}
