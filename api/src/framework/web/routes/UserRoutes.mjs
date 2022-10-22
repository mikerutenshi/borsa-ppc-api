import express from 'express';
import UserController from '../../../controller/UserController.mjs';

export default (dependencies) => {
  const router = express.Router();

  const controller = UserController(dependencies);

  router
    .route('/')
    .post((req, res, next) => {
      controller.addNewUser(req, res, next);
    })
    .get((req, res, next) => {
      controller.getAllUser(req, res, next);
    });
  router.route('/:username').get((req, res, next) => {
    controller.getUserByUsername(req, res, next);
  });

  return router;
};
