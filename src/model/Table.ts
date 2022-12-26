export default class Table {
  name: string;
  uniqueKey?: string;
  uniqueVal?: string;

  constructor(name: string, uniqueKey?: string, uniqueVal?: string) {
    this.name = name;
    this.uniqueKey = uniqueKey;
    this.uniqueVal = uniqueVal;
  }
}
