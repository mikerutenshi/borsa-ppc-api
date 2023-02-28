import BillOfMaterial from '../../../model/BillOfMaterial';
import BillOfMaterialRepository from '../../contract/BillOfMaterialRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateBillOfMaterial extends UpdateUseCase<BillOfMaterial> {
  constructor(repository: BillOfMaterialRepository) {
    super(repository);
  }
}
