import {
  AddUser,
  GetUsers,
  GetUser,
  GetFilteredUsers,
  UpdateUser,
  DeleteUser,
  Authenticate,
  RefreshAccessToken,
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
      res.status(201).json(new Response(Status.get(201), undefined, message));
    } catch (err) {
      next(err);
    }
  };

  const getUsers = async (req, res, next) => {
    try {
      if (req.query.search_key === undefined) {
        const data = await GetUsers(UserRepository).execute();
        res.json(new Response(Status.get(200), data, 'All users are loaded'));
      } else {
        const data = await GetFilteredUsers(UserRepository).execute(
          req.query.search_key,
          req.query.search_value
        );
        res.json(
          new Response(Status.get(200), data, 'Filtered users are loaded')
        );
      }
    } catch (err) {
      next(err);
    }
  };

  const getUser = async (req, res, next) => {
    try {
      const data = await GetUser(UserRepository).execute(req.params.id);
      res.json(new Response(Status.get(200), data, 'User is loaded'));
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
      res.json(
        new Response(Status.get(200), data, 'User is successfully updated')
      );
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
        status = Status.get(200);
        message = 'User is successfully deleted';
      } else {
        code = 404;
        status = Status.get(404);
        message = 'Cannot find user to delete';
      }

      res.status(code).json(new Response(status, undefined, message));
    } catch (err) {
      next(err);
    }
  };

  const authenticate = async (req, res, next) => {
    try {
      const users = await Authenticate(UserRepository).execute(
        req.body.username,
        req.body.password
      );

      res.json(
        new Response(
          Status.get(200),
          users,
          'User is successfully authenticated'
        )
      );
    } catch (err) {
      next(err);
    }
  };

  const refreshAccessToken = async (req, res, next) => {
    try {
      const newAccessToken = await RefreshAccessToken(UserRepository).execute(
        req.body.username,
        req.body.refresh_token
      );
      const data = [];
      data.push({
        access_token: newAccessToken,
      });
      res.json(
        new Response(
          Status.get(200),
          data,
          'New access token is successfully generated'
        )
      );
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
    authenticate,
    refreshAccessToken,
  };
};
