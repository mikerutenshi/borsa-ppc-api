import { Request, RequestHandler, Response } from 'express';
import CreateUser from '../application/use-case/user/CreateUser';
import GetFilteredUsers from '../application/use-case/user/GetFilteredUsers';
import GetUser from '../application/use-case/user/GetUser';
import GetUsers from '../application/use-case/user/GetUsers';
import UpdateUser from '../application/use-case/user/UpdateUser';
import DeleteUser from '../application/use-case/user/DeleteUser';
import ProjectDependencies from '../di/ProjectDependencies';
import { Status } from '../model/Enums';
import { GeneralResponse, SuccessfulResponse } from '../model/Responses';
import { User } from '../model/Users';
import AuthUser from '../application/use-case/user/AuthUser';
import RefreshAccessToken from '../application/use-case/user/RefreshAccessToken';

export default (dependencies: ProjectDependencies) => {
  type ReqQuery = {
    search_key: string;
    search_value: string;
  };

  const { userRepository } = dependencies.databaseService;

  const createUser = async (req: Request, res: Response) => {
    const user = new User(
      req.body.username,
      req.body.first_name,
      req.body.last_name,
      req.body.password,
      req.body.role_id
    );

    const newUser = await new CreateUser(userRepository!).execute(user);
    const message = 'User was added successfully';
    res.status(201).json(new GeneralResponse(Status[201], message, newUser));
  };

  const getUsers = async (req: Request, res: Response) => {
    if (req.query.search_key === undefined) {
      const data = await new GetUsers(userRepository!).execute();
      res.json(new SuccessfulResponse('All users are loaded', data));
    } else {
      const data = await new GetFilteredUsers(userRepository!).execute(
        req.query.search_key as string,
        req.query.search_value as string
      );
      res.json(new SuccessfulResponse('Filtered users are loaded', data));
    }
  };

  const getUser = async (req: Request, res: Response) => {
    const data = await new GetUser(userRepository!).execute(
      parseInt(req.params.id)
    );
    res.json(new SuccessfulResponse('User is loaded', data));
  };

  const updateUser = async (req: Request, res: Response) => {
    const data = await new UpdateUser(userRepository!).execute(req.body);
    res.json(new SuccessfulResponse('User is successfully updated', data));
  };

  const deleteUser = async (req: Request, res: Response) => {
    const message = 'User is successfully deleted';
    await new DeleteUser(userRepository!).execute(parseInt(req.params.id));

    res.json(new SuccessfulResponse(message));
  };

  const authUser = async (req: Request, res: Response) => {
    const users = await new AuthUser(userRepository!).execute(
      req.body.username,
      req.body.password
    );

    res.json(
      new SuccessfulResponse('User is successfully authenticated', users)
    );
  };

  const refreshAccessToken = async (req: Request, res: Response) => {
    const newAccessToken = await new RefreshAccessToken(
      userRepository!
    ).execute(req.body.username, req.body.refresh_token);
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
