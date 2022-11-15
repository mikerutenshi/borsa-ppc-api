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
import { Response, Status, SuccessfulResponse } from '../model/Response.mjs';
import User from '../model/User.mjs';

export default (dependencies) => {
  const { UserRepository } = dependencies.DatabaseService;

  const addNewUser = async (req, res) => {
    const user = new User(
      req.body.username,
      req.body.first_name,
      req.body.last_name,
      req.body.password,
      req.body.role_id
    );

    const addedUser = await AddUser(UserRepository).execute(user);
    const message = 'User was added successfully';
    res.status(201).json(new Response(Status.get(201), addedUser, message));
  };

  const getUsers = async (req, res) => {
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
  };

  const getUser = async (req, res) => {
    const data = await GetUser(UserRepository).execute(req.params.id);
    res.json(new Response(Status.get(200), data, 'User is loaded'));
  };

  const updateUser = async (req, res) => {
    const data = await UpdateUser(UserRepository).execute(
      req.params.id,
      req.body
    );
    res.json(
      new Response(Status.get(200), data, 'User is successfully updated')
    );
  };

  const deleteUser = async (req, res) => {
    const message = 'User is successfully deleted';
    const result = await DeleteUser(UserRepository).execute(req.params.id);

    res.status(200).json(new SuccessfulResponse(result, message));
  };

  const authenticate = async (req, res) => {
    const users = await Authenticate(UserRepository).execute(
      req.body.username,
      req.body.password
    );

    res.json(
      new Response(Status.get(200), users, 'User is successfully authenticated')
    );
  };

  const refreshAccessToken = async (req, res) => {
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
