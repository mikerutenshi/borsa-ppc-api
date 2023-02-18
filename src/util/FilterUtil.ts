import { BaseModel } from '../model/BaseModel';
import Filter from '../model/Filter';

const constructFilterFromKeys = <T>(param: T): Filter => {
  const _param = param as BaseModel;
  const __param = param as Filter;
  const filters: Filter = {};
  _param.unique_keys.forEach((key) => {
    filters[key] = __param[key];
  });

  return filters;
};

export { constructFilterFromKeys };
