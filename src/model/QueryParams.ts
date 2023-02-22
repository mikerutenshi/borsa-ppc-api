import ReqParams from './ReqParams';

export default class QueryParams extends ReqParams {
  private search_properties: string[];

  constructor(searchProperties: string[]) {
    super();
    this.search_properties = searchProperties;
  }

  setSearchProperties(searchProperties: string[]) {
    this.search_properties = searchProperties;
  }

  getSearchProperties() {
    return this.search_properties;
  }
}
