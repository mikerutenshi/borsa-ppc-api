interface CrudRepository<T> {
  create(instance: T): Promise<T>;
  getById(id: number, table?: string): Promise<T | null>;
  getAll(table?: string): Promise<T[]>;
  getManyByProp(property: string, value: string, table?: string): Promise<T[]>;
  getOneByProp(
    property: string,
    value: string,
    table?: string
  ): Promise<T | null>;
  update(instance: T): Promise<T>;
  delete(id: number, table?: string): Promise<void>;
  clear(table?: string): Promise<void>;
}

export default CrudRepository;
