import express from 'express';
import UserController from '../../../controller/UserController.mjs';

export default (dependencies) => {
  const router = express.Router();

  const controller = UserController(dependencies);

  router.route('/').post((req, res) => {
    controller.addNewUser();
  });

  return router;
};
