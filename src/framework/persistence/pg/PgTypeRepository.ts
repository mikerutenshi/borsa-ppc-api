import TypeRepository from '../../../application/contract/TypeRepository';
import { Type } from '../../../model/Types';
import PgCrudRepository from './PgCrudRepository';
import { TypeSql } from './sql';

export default class PgTypeRepository
  extends PgCrudRepository<Type>
  implements TypeRepository
{
  constructor() {
    super(TypeSql);
  }
}
