export class BaseModel {
  id: number;
  table_name: string;
  unique_key: string;

  constructor(tableName: string, uniqueKey: string) {
    this.id = 0;
    this.table_name = tableName;
    this.unique_key = uniqueKey;
  }
}
