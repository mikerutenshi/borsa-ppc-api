import Role from '../model/Role.mjs';
import {
  AddRole,
  GetRoles,
  UpdateRole,
} from '../application/use-case/RoleUseCase.mjs';
import { Response, SuccessfulResponse, Status } from '../model/Response.mjs';

export default (dependencies) => {
  const { RoleRepository } = dependencies.DatabaseService;

  const addNewRole = async (req, res, next) => {
    try {
      const role = new Role(req.name);
      const result = await AddRole(RoleRepository).execute(role);
      const message = 'Role was added successfully';
      res.status(201).json(new Response(Status.get(201), result, message));
    } catch (err) {
      next(err);
    }
  };

  const getRoles = async (req, res, next) => {
    try {
      if (req.query.search_key === undefined) {
        const data = await GetRoles(RoleRepository).execute();
        const message = 'All roles are loaded';
        res.json(new SuccessfulResponse(data, message));
      } else {
        const key = req.query.search_key;
        const value = req.query.value;
        const data = await GetFilteredRoles(RoleRepository).execute(key, value);
        const message = 'Filtered roles are loaded';
        res.json(new Response(Status.get(200), data, message));
      }
    } catch (err) {
      next(err);
    }
  };

  const getRole = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await GetRole(RoleRepository).execute(id);
      const message = 'Role is loaded';
      res.json(new SuccessfulResponse(data, message));
    } catch (err) {
      next(err);
    }
  };

  const updateRole = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await UpdateRole(RoleRepository).execute(id, data);
      const message = 'Role is successfully updated';
      res.json(new SuccessfulResponse(result, message));
    } catch (err) {
      next(err);
    }
  };

  const deleteRole = async (req, res, next) => {
    try {
      const id = req.params.id;
      res.json(new SuccessfulResponse());
    } catch (err) {
      next(err);
    }
  };
  return {
    addNewRole,
    getRoles,
    getRole,
    updateRole,
  };
};
