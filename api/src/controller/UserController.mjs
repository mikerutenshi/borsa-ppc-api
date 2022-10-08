import { AddUser } from '../application/domain/UserUseCase.mjs';

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

  return {
    addNewUser,
  };
};
