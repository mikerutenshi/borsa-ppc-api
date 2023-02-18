import Role from '../model/Role';
import { GeneralResponse, SuccessfulResponse } from '../model/Responses';
import ProjectDependencies from '../di/ProjectDependencies';
import CreateRole from '../application/use-case/role/CreateRole';
import { Request, Response } from 'express';
import GetRoles from '../application/use-case/role/GetRoles';
import GetRole from '../application/use-case/role/GetRole';
import UpdateRole from '../application/use-case/role/UpdateRole';
import DeleteRole from '../application/use-case/role/DeleteRole';
import { Status } from '../model/Enums';
import GetAllRoles from '../application/use-case/role/GetAllRoles';

export default (dependencies: ProjectDependencies) => {
  const { roleRepository } = dependencies.databaseService;

  const createRole = async (req: Request, res: Response) => {
    const role = new Role(req.body.name);
    const result = await new CreateRole(roleRepository).execute(role);
    const message = 'Role is successfully created';
    res.status(201).json(new GeneralResponse(Status[201], message, result));
  };

  const getRoles = async (req: Request, res: Response) => {
    if (req.query.search_key) {
      const key = req.query.search_key;
      const data = await new GetRoles(roleRepository).execute(key as string, [
        'name',
      ]);
      const message = 'Search roles are loaded';
      res.json(new SuccessfulResponse(message, data));
    } else {
      const data = await new GetRoles(roleRepository).execute();
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
    const result = await new UpdateRole(roleRepository, data.name).execute(
      data
    );
    const message = 'Role is successfully updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteRole = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await new DeleteRole(roleRepository).execute(id);
    const message = 'Role is successfully deleted';
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
