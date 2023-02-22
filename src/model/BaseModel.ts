export class BaseModel {
  id: number;
  table_name: string;
  unique_keys: string[];

  constructor(tableName: string, uniqueKeys: string[]) {
    this.id = 0;
    this.table_name = tableName;
    this.unique_keys = uniqueKeys;
  }
}
