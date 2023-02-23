import KeyValuePair from '../../model/KeyValuePair';
import QueryParams from '../../model/QueryParams';
import CrudRepository from './CrudRepository';

interface CrudGenericTableRepository<T>
  extends Omit<
    CrudRepository<T>,
    | 'getAll'
    | 'getOneById'
    | 'getOneByProperty'
    | 'getMany'
    | 'delete'
    | 'clear'
  > {
  getAll(tableName: string): Promise<T[]>;
  getOneById(id: number, tableName: string): Promise<T | null>;
  getOneByProperty(
    keyValue: KeyValuePair,
    tableName: string
  ): Promise<T | null>;
  getMany(params: QueryParams, tableName: string): Promise<T[]>;
  delete(id: number[], tableName: string): Promise<void>;
  clear(tableName: string): Promise<void>;
}

export default CrudGenericTableRepository;
