import BillOfMaterial from '../../model/BillOfMaterial';
import CrudRepository from './CrudRepository';

export default interface BillOfMaterialRepository
  extends CrudRepository<BillOfMaterial> {}
