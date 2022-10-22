import {
  AddUser,
  GetUsers,
  GetUser,
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

  const getAllUser = async (_, res, next) => {
    try {
      const data = await GetUsers(UserRepository).execute();
      res.json(new Response(Status.ok, data, 'All users are loaded'));
    } catch (err) {
      next(err);
    }
  };

  const getUserByUsername = async (req, res, next) => {
    try {
      const user = await GetUser(UserRepository).execute(req.params.username);
      res.json(new Response(Status.ok, user, 'User is loaded'));
    } catch (err) {
      nexp(err);
    }
  };

  return {
    addNewUser,
    getAllUser,
    getUserByUsername,
  };
};
