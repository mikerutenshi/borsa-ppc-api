interface CrudRepository<T> {
  create(instance: T): Promise<T>;
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  getByProp(property: string, value: string): Promise<T[]>;
  getByName(name: string): Promise<T>;
  update(instance: T): Promise<T>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}

export default CrudRepository;
