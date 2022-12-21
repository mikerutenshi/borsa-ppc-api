export class BaseModel {
  id: number;
  className: string;

  constructor(className: string) {
    this.id = 1;
    this.className = className;
  }
}
