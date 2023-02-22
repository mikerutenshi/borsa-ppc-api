export default class ReqParams {
  search_key?: string;
  order_by?: string;
  order_direction?: string;
  page_index?: string;
  page_limit?: number;

  constructor(
    searchKey?: string,
    orderBy?: string,
    orderDirection?: string,
    pageIndex?: string,
    pageLimit?: number
  ) {
    this.search_key = searchKey;
    this.order_by = orderBy;
    this.order_direction = orderDirection;
    this.page_index = pageIndex;
    this.page_limit = pageLimit;
  }
}
