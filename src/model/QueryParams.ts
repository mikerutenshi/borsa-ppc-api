import ReqParams from './ReqParams';

export default class QueryParams extends ReqParams {
  private search_properties: string[];

  constructor(
    searchProperties: string[],
    searchKey?: string,
    orderBy?: string,
    orderDirection?: string,
    pageIndex?: string,
    pageLimit?: number
  ) {
    super(searchKey, orderBy, orderDirection, pageIndex, pageLimit);
    this.search_properties = searchProperties;
  }

  setSearchProperties(searchProperties: string[]) {
    this.search_properties = searchProperties;
  }

  getSearchProperties() {
    return this.search_properties;
  }
}
