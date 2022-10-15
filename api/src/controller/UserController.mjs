import { AddUser, GetUsers } from '../application/use-case/UserUseCase.mjs';

export default (dependencies) => {
  const { userRepository } = dependencies.DatabaseService;

  const addNewUser = (req, res, next) => {
    const addUserCommand = AddUser(userRepository);
    const user = req.body;
    addUserCommand.execute(user).then(
      (response) => {
        res.json(response);
      },
      (err) => {
        next(err);
      }
    );
  };

  const getAllUser = (req, res, next) => {
    console.log('controller invoked');
    const getUsersCommand = GetUsers(userRepository);
    getUsersCommand.execute().then(
      (response) => {
        res.json(response);
      },
      (err) => {
        next(err);
      }
    );
  };

  return {
    addNewUser,
    getAllUser,
  };
};
