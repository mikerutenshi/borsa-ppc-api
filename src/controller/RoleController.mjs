import Role from '../model/Role.mjs';
import {
  AddRole,
  GetRoles,
  GetRole,
  UpdateRole,
  DeleteRole,
  GetFilteredRoles,
} from '../application/use-case/RoleUseCase.mjs';
import { Response, SuccessfulResponse, Status } from '../model/Response.mjs';

export default (dependencies) => {
  const { RoleRepository } = dependencies.DatabaseService;

  const addNewRole = async (req, res) => {
    const role = new Role(req.body.name);
    const result = await AddRole(RoleRepository).execute(role);
    const message = 'Role is successfully added';
    res.status(201).json(new Response(Status.get(201), result, message));
  };

  const getRoles = async (req, res) => {
    if (req.query.search_key === undefined) {
      const data = await GetRoles(RoleRepository).execute();
      const message = 'All roles are loaded';
      res.json(new SuccessfulResponse(data, message));
    } else {
      const key = req.query.search_key;
      const value = req.query.search_value;
      const data = await GetFilteredRoles(RoleRepository).execute(key, value);
      const message = 'Filtered roles are loaded';
      res.json(new Response(Status.get(200), data, message));
    }
  };

  const getRole = async (req, res) => {
    const id = req.params.id;
    const data = await GetRole(RoleRepository).execute(id);
    const message = 'Role is loaded';
    res.json(new SuccessfulResponse(data, message));
  };

  const updateRole = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result = await UpdateRole(RoleRepository).execute(id, data);
    const message = 'Role is successfully updated';
    res.json(new SuccessfulResponse(result, message));
  };

  const deleteRole = async (req, res) => {
    const id = req.params.id;
    const result = await DeleteRole(RoleRepository).execute(id);
    const message = 'Role is successfully deleted';
    res.json(new SuccessfulResponse(result, message));
  };
  return {
    addNewRole,
    getRoles,
    getRole,
    updateRole,
    deleteRole,
  };
};
