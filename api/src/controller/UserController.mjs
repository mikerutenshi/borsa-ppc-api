import {
  AddUser,
  GetUsers,
  GetUser,
  GetFilteredUsers,
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
      if (req.search_key === undefined) {
        const data = await GetUsers(UserRepository).execute();
        res.json(new Response(Status.ok, data, 'All users are loaded'));
      } else {
        const data = await GetFilteredUsers(UserRepository).execute();
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

  return {
    addNewUser,
    getUsers,
    getUser,
  };
};
