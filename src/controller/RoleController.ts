import { Request, Response } from 'express';
import CreateRole from '../application/use-case/role/CreateRole';
import DeleteRole from '../application/use-case/role/DeleteRole';
import GetAllRoles from '../application/use-case/role/GetAllRoles';
import GetRole from '../application/use-case/role/GetRole';
import GetRoles from '../application/use-case/role/GetRoles';
import UpdateRole from '../application/use-case/role/UpdateRole';
import ProjectDependencies from '../di/ProjectDependencies';
import { Status } from '../model/Enums';
import { GeneralResponse, SuccessfulResponse } from '../model/Responses';
import Role from '../model/Role';
import { createParamsFromReq, getIdsFromReq } from '../util/FilterUtil';

export default (dependencies: ProjectDependencies) => {
  const { roleRepository } = dependencies.databaseService;

  const createRole = async (req: Request, res: Response) => {
    const role = new Role(req.body.name);
    const result = await new CreateRole(roleRepository).execute(role);
    const message = 'Role is successfully created';
    res.status(201).json(new GeneralResponse(Status[201], message, result));
  };

  const getRoles = async (req: Request, res: Response) => {
    if (req.query) {
      const queryParams = createParamsFromReq(req, ['name']);
      const data = await new GetRoles(roleRepository).execute(queryParams);
      const message = 'Roles are loaded';
      res.json(new SuccessfulResponse(message, data));
    } else {
      const data = await new GetAllRoles(roleRepository).execute();
      const message = 'All roles are loaded';
      res.json(new SuccessfulResponse(message, data));
    }
  };

  const getRole = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await new GetRole(roleRepository).execute(id);
    const message = 'Role is loaded';
    res.json(new SuccessfulResponse(message, data));
  };

  const updateRole = async (req: Request, res: Response) => {
    const data = new Role(req.body.name);
    data.id = parseInt(req.params.id);
    const result = await new UpdateRole(roleRepository).execute(data);
    const message = 'Role is successfully updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteRole = async (req: Request, res: Response) => {
    const ids = getIdsFromReq(req);
    await new DeleteRole(roleRepository).execute(ids, new Role(''));
    const message = 'Selected roles are successfully deleted';
    res.json(new SuccessfulResponse(message));
  };
  return {
    createRole,
    getRoles,
    getRole,
    updateRole,
    deleteRole,
  };
};
