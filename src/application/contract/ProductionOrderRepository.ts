import {ProductionOrder} from '../../model/ProductionOrders';
import CrudRepository from './CrudRepository';

export default interface ProductionOrderRepository extends CrudRepository<ProductionOrder> {}
