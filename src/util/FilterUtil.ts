import { Request } from 'express';
import { BaseModel } from '../model/BaseModel';
import KeyValuePair from '../model/KeyValuePair';
import QueryParams from '../model/QueryParams';
import ReqParams from '../model/ReqParams';

const createParamsFromReq = (
  req: Request,
  searchProperties: string[]
): QueryParams => {
  const searchKey = (req.query.search_key as string) ?? null;
  const orderBy = (req.query.order_by as string) ?? null;
  const orderDirection = (req.query.order_direction as string) ?? null;
  const pageIndex = (req.query.page_index as string) ?? null;
  const pageLimit = parseInt(req.query.page_limit as string) ?? null;

  const reqParams = new ReqParams(
    searchKey,
    orderBy,
    orderDirection,
    pageIndex,
    pageLimit
  );

  const queryParams = reqParams as QueryParams;

  queryParams.setSearchProperties(searchProperties);

  return queryParams;
};

const createPairFromParam = <T>(param: T) => {
  const _param = param as BaseModel;
  const __param = param as KeyValuePair;
  const keys = _param.unique_keys;
  const keyValues: KeyValuePair = {};
  keys.forEach((key) => {
    keyValues[key] = __param[key];
  });
  return keyValues;
};

export { createParamsFromReq, createPairFromParam };
