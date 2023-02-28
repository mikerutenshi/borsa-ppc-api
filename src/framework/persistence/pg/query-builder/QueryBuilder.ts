import KeyValuePair from '../../../../model/KeyValuePair';

export default class QueryBuilder {
  private filters: { [key: string]: string } = {};
  private orderString: string = '';
  private limitString: string = '';

  propertyFilter(keyValues: KeyValuePair) {
    const propertyFilter = Object.entries(keyValues)
      .map(([key, value]) => {
        return `${key} = '${value}'`;
      })
      .join(` AND `);
    this.filters.propertyFilter = propertyFilter;
    return this;
  }

  search(searchKey?: string, properties?: string[]) {
    if (properties && searchKey) {
      this.filters.search = properties
        .map((prop) => {
          if (!isNaN(Number(searchKey)) && prop.includes('_id')) {
            return `${prop} = ${searchKey}`;
          } else {
            return `${prop} ILIKE '%${searchKey}%'`;
          }
        })
        .join(` OR `);
    }
    return this;
  }

  page(
    orderBy?: string,
    orderDirection?: string,
    index?: string,
    limit?: number
  ) {
    if (orderBy && orderDirection && index && limit) {
      if (orderDirection.toUpperCase().match('ASC')) {
        this.filters.page = `${orderBy} > ${index}`;
        this.limitString = `LIMIT ${limit.toString()}`;
        this.order(orderBy, orderDirection);
      } else if (orderDirection.toUpperCase().match('DESC')) {
        this.filters.page = `${orderBy} < ${index}`;
        this.limitString = `LIMIT ${limit.toString()}`;
        this.order(orderBy, orderDirection);
      } else {
        throw Error(
          'Invalid order direction, only ASC and DESC are acceptable'
        );
      }
    }

    return this;
  }

  order(key: string, direction: string) {
    this.orderString = `ORDER BY '${key}' ${direction.toUpperCase()}`;
    return this;
  }

  build(): KeyValuePair {
    const getFilters = Object.values(this.filters).filter(Boolean);
    const filterString =
      getFilters?.length > 0 ? `WHERE ${getFilters.join(` AND `)}` : '';
    const result = {
      condition: filterString + this.orderString + this.limitString,
    };
    return result;
  }
}
