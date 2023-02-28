import BillOfMaterial from '../../../model/BillOfMaterial';
import BillOfMaterialRepository from '../../contract/BillOfMaterialRepository';
import DeleteUseCase from '../DeleteUseCase';
export default class DeleteBillOfMaterial extends DeleteUseCase<BillOfMaterial> {
  constructor(repository: BillOfMaterialRepository) {
    super(repository);
  }
}
