import { Material } from '../../../model/Materials';
import MaterialRepository from '../../contract/MaterialRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateMaterial extends CreateUseCase<Material> {
  constructor(repository: MaterialRepository) {
    super(repository);
  }
}
