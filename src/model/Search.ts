export default class Search {
  value: string;
  properties: string[];

  constructor(value: string, properties: string[]) {
    this.value = value;
    this.properties = properties;
  }
}
