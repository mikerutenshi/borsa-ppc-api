import TypeRepository from '../../../application/contract/TypeRepository';
import { Type } from '../../../model/Types';
import PgCrudGenericTableRepository from './PgCrudGenericTableRepository';
import { TypeSql } from './sql';

export default class PgTypeRepository
  extends PgCrudGenericTableRepository<Type>
  implements TypeRepository
{
  constructor() {
    super(TypeSql);
  }
}
