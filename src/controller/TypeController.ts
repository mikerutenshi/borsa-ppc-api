import ProjectDependencies from '../di/ProjectDependencies';
import { GeneralResponse, SuccessfulResponse } from '../model/Responses';
import { Status } from '../model/Enums';
import { Request, Response } from 'express';
import { Type } from '../model/Types';
import CreateType from '../application/use-case/type/CreateType';
import GetTypes from '../application/use-case/type/GetTypes';
import GetType from '../application/use-case/type/GetType';
import GetFilteredTypes from '../application/use-case/type/GetFilteredTypes';
import UpdateType from '../application/use-case/type/UpdateType';
import DeleteType from '../application/use-case/type/DeleteType';

export default (tableName: string, dependencies: ProjectDependencies) => {
  const { typeRepository } = dependencies.databaseService;

  const createType = async (req: Request, res: Response) => {
    const _type = new Type(req.body.name);
    const result = await new CreateType(typeRepository, _type.name).execute(
      _type,
      tableName
    );
    const message = 'Type is successfully created';
    res.status(201).json(new GeneralResponse(Status[201], message, result));
  };

  const getTypes = async (req: Request, res: Response) => {
    if (req.query.search_key === undefined) {
      const data = await new GetTypes(typeRepository).execute(tableName);
      const message = 'All types are loaded';
      res.json(new SuccessfulResponse(message, data));
    } else {
      const key = req.query.search_key;
      const value = req.query.search_value;
      const data = await new GetFilteredTypes(typeRepository).execute(
        key as string,
        value as string,
        tableName
      );
      const message = 'Filtered roles are loaded';
      res.json(new SuccessfulResponse(message, data));
    }
  };

  const getType = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await new GetType(typeRepository).execute(id, tableName);
    const message = 'Type is loaded';
    res.json(new SuccessfulResponse(message, data));
  };

  const updateType = async (req: Request, res: Response) => {
    const typeData = new Type(req.body.name);
    typeData.id = parseInt(req.params.id);
    const result = await new UpdateType(typeRepository, 'name').execute(
      typeData,
      tableName
    );
    const message = 'Type is successfully updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteType = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await new DeleteType(typeRepository).execute(id, tableName);
    const message = 'Type is successfully deleted';
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
