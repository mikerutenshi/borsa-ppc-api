interface DynamicColumn {
  [key: string]: any;
}
export class BaseModel implements DynamicColumn {
  id: number;
  table: string;
  uniqueKey: string;
  uniqueVal: string;

  constructor(table: string, uniqueKey: string, uniqueVal: string) {
    this.id = 1;
    this.table = table;
    this.uniqueKey = uniqueKey;
    this.uniqueVal = uniqueVal;
  }
}
