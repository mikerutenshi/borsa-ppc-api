import { Request, Response } from 'express';
import CreateType from '../application/use-case/type/CreateType';
import DeleteType from '../application/use-case/type/DeleteType';
import GetAllTypes from '../application/use-case/type/GetAllTypes';
import GetType from '../application/use-case/type/GetType';
import GetTypes from '../application/use-case/type/GetTypes';
import UpdateType from '../application/use-case/type/UpdateType';
import ProjectDependencies from '../di/ProjectDependencies';
import { Status } from '../model/Enums';
import { GeneralResponse, SuccessfulResponse } from '../model/Responses';
import { Type } from '../model/Types';
import { createParamsFromReq, getIdsFromReq } from '../util/FilterUtil';
import { prettierTableName } from '../util/StringUtil';

export default (tableName: string, dependencies: ProjectDependencies) => {
  const { typeRepository } = dependencies.databaseService;
  const tableNamePretty = prettierTableName(tableName);

  const createType = async (req: Request, res: Response) => {
    const _type = new Type(req.body.name, tableName);
    const result = await new CreateType(typeRepository).execute(_type);
    const message = `${tableNamePretty} is successfully created`;
    res.status(201).json(new GeneralResponse(Status[201], message, result));
  };

  const getTypes = async (req: Request, res: Response) => {
    if (req.query) {
      const params = createParamsFromReq(req, ['name']);
      const data = await new GetTypes(typeRepository).execute(
        params,
        tableName
      );
      const message = `${tableNamePretty}s are loaded`;
      res.json(new SuccessfulResponse(message, data));
    } else {
      const data = await new GetAllTypes(typeRepository).execute(tableName);
      const message = `All ${tableNamePretty} are loaded`;
      res.json(new SuccessfulResponse(message, data));
    }
  };

  const getType = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await new GetType(typeRepository).execute(id, tableName);
    const message = `${tableNamePretty} is loaded`;
    res.json(new SuccessfulResponse(message, data));
  };

  const updateType = async (req: Request, res: Response) => {
    const typeData = new Type(req.body.name, tableName);
    typeData.id = parseInt(req.params.id);
    const result = await new UpdateType(typeRepository).execute(typeData);
    const message = `${tableNamePretty} is successfully updated`;
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteType = async (req: Request, res: Response) => {
    const ids = getIdsFromReq(req);
    await new DeleteType(typeRepository).execute(ids, new Type('', tableName));
    const message = `Selected ${tableNamePretty}s are successfully deleted`;
    res.json(new SuccessfulResponse(message));
  };

  return {
    createType,
    getTypes,
    getType,
    updateType,
    deleteType,
  };
};
