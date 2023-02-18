import QueryParams from '../../model/QueryParams';

interface CrudRepository<T> {
  create(instance: T): Promise<T>;
  getAll(): Promise<T[]>;
  getOneById(id: number): Promise<T | null>;
  getOneByProperty(key: string, value: string): Promise<T | null>;
  getMany(params: QueryParams): Promise<T[]>;
  update(instance: T): Promise<T>;
  delete(id: number[]): Promise<void>;
  clear(): Promise<void>;
}

export default CrudRepository;
