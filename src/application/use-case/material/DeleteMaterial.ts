import { Material } from '../../../model/Materials';
import MaterialRepository from '../../contract/MaterialRepository';
import DeleteUseCase from '../DeleteUseCase';
export default class DeleteMaterial extends DeleteUseCase<Material> {
  constructor(repository: MaterialRepository) {
    super(repository);
  }
}
