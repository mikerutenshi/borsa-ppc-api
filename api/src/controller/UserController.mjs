import { AddUser, GetUsers } from '../application/use-case/UserUseCase.mjs';
import ValidationError from '../model/Error.mjs';
import { Response, Status } from '../model/Response.mjs';

export default (dependencies) => {
  const { userRepository } = dependencies.DatabaseService;

  const addNewUser = async (req, res, next) => {
    try {
      const user = req.body;
      const message = await AddUser(userRepository).execute(user);
      res.status(201).json(new Response(Status.created, undefined, message));
    } catch (err) {
      next(err);
    }
  };

  const getAllUser = async (_, res, next) => {
    try {
      const data = await GetUsers(userRepository).execute();
      res.json(new Response(Status.ok, data, 'All users are loaded'));
    } catch (err) {
      next(err);
    }
  };

  return {
    addNewUser,
    getAllUser,
  };
};
