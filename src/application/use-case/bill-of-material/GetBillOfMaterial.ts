import BillOfMaterial from '../../../model/BillOfMaterial';
import BillOfMaterialRepository from '../../contract/BillOfMaterialRepository';
import GetOneUseCase from '../GetOneUseCase';

export default class GetBillOfMaterial extends GetOneUseCase<BillOfMaterial> {
  constructor(repository: BillOfMaterialRepository) {
    super(repository);
  }
}
