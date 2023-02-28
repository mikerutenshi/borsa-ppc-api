import { Material } from '../../../model/Materials';
import MaterialRepository from '../../contract/MaterialRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateMaterial extends UpdateUseCase<Material> {
  constructor(repository: MaterialRepository) {
    super(repository);
  }
}
