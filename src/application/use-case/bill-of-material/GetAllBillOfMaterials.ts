import BillOfMaterial from '../../../model/BillOfMaterial';
import BillOfMaterialRepository from '../../contract/BillOfMaterialRepository';
import GetAllUseCase from '../GetAllUseCase';

export default class GetAllBillOfMaterials extends GetAllUseCase<BillOfMaterial> {
  constructor(repository: BillOfMaterialRepository) {
    super(repository);
  }
}
