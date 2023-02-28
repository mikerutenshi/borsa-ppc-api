import BillOfMaterial from '../../../model/BillOfMaterial';
import BillOfMaterialRepository from '../../contract/BillOfMaterialRepository';
import GetManyUseCase from '../GetManyUseCase';

export default class GetBillOfMaterials extends GetManyUseCase<BillOfMaterial> {
  constructor(repository: BillOfMaterialRepository) {
    super(repository);
  }
}
