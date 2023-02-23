import { Request } from 'express';
import { BaseModel } from '../model/BaseModel';
import KeyValuePair from '../model/KeyValuePair';
import QueryParams from '../model/QueryParams';

const createParamsFromReq = (
  req: Request,
  searchProperties: string[]
): QueryParams => {
  const searchKey = (req.query.search_key as string) ?? null;
  const orderBy = (req.query.order_by as string) ?? null;
  const orderDirection = (req.query.order_direction as string) ?? null;
  const pageIndex = (req.query.page_index as string) ?? null;
  const pageLimit = parseInt(req.query.page_limit as string) ?? null;

  const queryParams = new QueryParams(
    searchProperties,
    searchKey,
    orderBy,
    orderDirection,
    pageIndex,
    pageLimit
  );

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

const getIdsFromReq = (req: Request): number[] => {
  const ids = req.query.id;
  let deleteIds: number[] = [];

  if (Array.isArray(ids)) {
    deleteIds = ids.map((id) => {
      return parseInt(id as string);
    });
  } else {
    deleteIds.push(parseInt(ids as string));
  }
  return deleteIds;
};

export { createParamsFromReq, createPairFromParam, getIdsFromReq };
