import { Request, Response } from 'express';
import AuthUser from '../application/use-case/user/AuthUser';
import CreateUser from '../application/use-case/user/CreateUser';
import DeleteUser from '../application/use-case/user/DeleteUser';
import GetAllUsers from '../application/use-case/user/GetAllUsers';
import GetUser from '../application/use-case/user/GetUser';
import GetUsers from '../application/use-case/user/GetUsers';
import RefreshAccessToken from '../application/use-case/user/RefreshAccessToken';
import UpdateUser from '../application/use-case/user/UpdateUser';
import ProjectDependencies from '../di/ProjectDependencies';
import { Status } from '../model/Enums';
import { GeneralResponse, SuccessfulResponse } from '../model/Responses';
import { User } from '../model/Users';
import { createParamsFromReq, getIdsFromReq } from '../util/FilterUtil';

export default (dependencies: ProjectDependencies) => {
  const { userRepository } = dependencies.databaseService;

  const createUser = async (req: Request, res: Response) => {
    const user = new User(
      req.body.username,
      req.body.first_name,
      req.body.last_name,
      req.body.password,
      req.body.role_id
    );

    const newUser = await new CreateUser(userRepository).execute(user);
    const message = 'User is successfully created';
    res.status(201).json(new GeneralResponse(Status[201], message, newUser));
  };

  const getUsers = async (req: Request, res: Response) => {
    if (req.query) {
      const reqParams = createParamsFromReq(req, [
        'username',
        'first_name',
        'last_name',
      ]);
      const data = await new GetUsers(userRepository).execute(reqParams);
      res.json(new SuccessfulResponse('Users are loaded', data));
    } else {
      const data = await new GetAllUsers(userRepository).execute();
      res.json(new SuccessfulResponse('All users are loaded', data));
    }
  };

  const getUser = async (req: Request, res: Response) => {
    const data = await new GetUser(userRepository).execute(
      parseInt(req.params.id)
    );
    res.json(new SuccessfulResponse('User is loaded', data));
  };

  const updateUser = async (req: Request, res: Response) => {
    const request = req.body;
    const user = new User(
      '',
      request.first_name,
      request.last_name,
      '',
      request.role_id,
      request.is_active
    );
    user.id = parseInt(req.params.id);
    const data = await new UpdateUser(userRepository).execute(user);
    res.json(new SuccessfulResponse('User is successfully updated', data));
  };

  const deleteUser = async (req: Request, res: Response) => {
    const message = 'Selected users are successfully deleted';
    const ids = getIdsFromReq(req);
    await new DeleteUser(userRepository).execute(
      ids,
      new User('', '', '', '', 0)
    );

    res.json(new SuccessfulResponse(message));
  };

  const authUser = async (req: Request, res: Response) => {
    const users = await new AuthUser(userRepository).execute(
      req.body.username,
      req.body.password
    );

    res.json(
      new SuccessfulResponse('User is successfully authenticated', users)
    );
  };

  const refreshAccessToken = async (req: Request, res: Response) => {
    const newAccessToken = await new RefreshAccessToken(userRepository).execute(
      req.body.username,
      req.body.refresh_token
    );
    const data = [];
    data.push({
      access_token: newAccessToken,
    });
    res.json(
      new SuccessfulResponse('New access token is successfully generated', data)
    );
  };

  return {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    authUser,
    refreshAccessToken,
  };
};
