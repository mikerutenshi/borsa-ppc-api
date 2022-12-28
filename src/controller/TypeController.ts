import ProjectDependencies from '../di/ProjectDependencies';
import { GeneralResponse, SuccessfulResponse } from '../model/Responses';
import { Status } from '../model/Enums';
import { Request, Response } from 'express';
import { Type } from '../model/Types';
import CreateType from '../application/use-case/type/CreateType';

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

  //const getType = async (req: Request, res: Response) => {
  //  if (req.query.search_key === undefined) {
  //    const data = await new GetRoles(roleRepository).execute();
  //    const message = 'All roles are loaded';
  //    res.json(new SuccessfulResponse(message, data));
  //  } else {
  //    const key = req.query.search_key;
  //    const value = req.query.search_value;
  //    const data = await new GetFilteredRoles(roleRepository).execute(
  //      key as string,
  //      value as string
  //    );
  //    const message = 'Filtered roles are loaded';
  //    res.json(new SuccessfulResponse(message, data));
  //  }
  //};

  //const getTypes = async (req: Request, res: Response) => {
  //  const id = parseInt(req.params.id);
  //  const data = await new GetRole(roleRepository).execute(id);
  //  const message = 'Role is loaded';
  //  res.json(new SuccessfulResponse(message, data));
  //};

  //const updateType = async (req: Request, res: Response) => {
  //  const data = req.body;
  //  data.id = req.params.id;
  //  const result = await new UpdateRole(roleRepository).execute(data);
  //  const message = 'Role is successfully updated';
  //  res.json(new SuccessfulResponse(message, result));
  //};

  //const deleteType = async (req: Request, res: Response) => {
  //  const id = parseInt(req.params.id);
  //  await new DeleteRole(roleRepository).execute(id);
  //  const message = 'Role is successfully deleted';
  //  res.json(new SuccessfulResponse(message));
  //};

  return {
    createType,
  };
};
