class Page {
  index: Index[];
  limit: number;
  direction: string;

  constructor(index: Index[], limit: number, direction: string) {
    this.index = index;
    this.limit = limit;
    this.direction = direction;
  }
}

interface Index {
  [column: string]: string;
}

export { Page };
