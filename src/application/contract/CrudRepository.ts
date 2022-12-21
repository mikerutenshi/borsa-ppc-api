interface CrudRepository<T> {
  create(instance: T): Promise<T>;
  getById(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  getManyByProp(property: string, value: string): Promise<T[]>;
  getOneByProp(property: string, value: string): Promise<T | null>;
  update(instance: T): Promise<T>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}

export default CrudRepository;
