class Page {
  index: Index[];
  limit: number;
  orderBy: string;
  direction: string;

  constructor(
    index: Index[],
    limit: number,
    orderBy: string,
    direction: string
  ) {
    this.index = index;
    this.limit = limit;
    this.orderBy = orderBy;
    this.direction = direction;
  }
}

interface Index {
  [column: string]: string;
}

export { Page };
