import { Type } from '../../model/Types';
import CrudGenericTableRepository from './CrudGenericTableRepository';

export default interface TypeRepository
  extends CrudGenericTableRepository<Type> {}
