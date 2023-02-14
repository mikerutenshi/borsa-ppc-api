export class BaseModel {
  id: number;

  constructor() {
    this.id = 1;
  }
}

export interface ArbitraryTestObject {
  [column: string]: string;
}
