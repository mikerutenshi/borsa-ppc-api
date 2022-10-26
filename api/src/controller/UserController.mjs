import {
  AddUser,
  GetUsers,
  GetUser,
  GetFilteredUsers,
  UpdateUser,
  DeleteUser,
} from '../application/use-case/UserUseCase.mjs';
import { Response, Status } from '../model/Response.mjs';
import User from '../model/User.mjs';

export default (dependencies) => {
  const { UserRepository } = dependencies.DatabaseService;

  const addNewUser = async (req, res, next) => {
    try {
      const user = new User(
        req.body.username,
        req.body.first_name,
        req.body.last_name,
        req.body.password,
        req.body.role_id
      );

      const message = await AddUser(UserRepository).execute(user);
      res.status(201).json(new Response(Status.created, undefined, message));
    } catch (err) {
      next(err);
    }
  };

  const getUsers = async (req, res, next) => {
    try {
      if (req.query.search_key === undefined) {
        const data = await GetUsers(UserRepository).execute();
        res.json(new Response(Status.ok, data, 'All users are loaded'));
      } else {
        const data = await GetFilteredUsers(UserRepository).execute(
          req.query.search_key,
          req.query.search_value
        );
        res.json(new Response(Status.ok, data, 'Filtered users are loaded'));
      }
    } catch (err) {
      next(err);
    }
  };

  const getUser = async (req, res, next) => {
    try {
      const data = await GetUser(UserRepository).execute(req.params.id);
      res.json(new Response(Status.ok, data, 'User is loaded'));
    } catch (err) {
      next(err);
    }
  };

  const updateUser = async (req, res, next) => {
    try {
      const data = await UpdateUser(UserRepository).execute(
        req.params.id,
        req.body
      );
      res.json(new Response(Status.ok, data, 'User is successfully updated'));
    } catch (err) {
      next(err);
    }
  };

  const deleteUser = async (req, res, next) => {
    try {
      let status = null;
      let message = null;
      let code = null;
      const result = await DeleteUser(UserRepository).execute(req.params.id);

      if (result) {
        code = 200;
        status = Status.ok;
        message = 'User is successfully deleted';
      } else {
        code = 404;
        status = Status.notFound;
        message = 'Cannot find user to delete';
      }

      res.status(code).json(new Response(status, undefined, message));
    } catch (err) {
      next(err);
    }
  };

  return {
    addNewUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
  };
};
