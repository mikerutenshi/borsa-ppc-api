import express from 'express';
import UserController from '../../../controller/UserController.mjs';
import { SchemaValidator } from '../middleware/SchemaValidator.mjs';

export default (dependencies) => {
  const router = express.Router();

  const controller = UserController(dependencies);

  router
    .route('/')
    .post(
      (req, res, next) => {
        SchemaValidator(req, res, next);
      },
      (req, res, next) => {
        controller.addNewUser(req, res, next);
      }
    )
    .get((req, res, next) => {
      controller.getUsers(req, res, next);
    });

  router
    .route('/:id')
    .get((req, res, next) => {
      controller.getUser(req, res, next);
    })
    .put((req, res, next) => {
      controller.updateUser(req, res, next);
    })
    .delete((req, res, next) => {
      controller.deleteUser(req, res, next);
    });

  router.route('/authenticate').post(
    (req, res, next) => {
      SchemaValidator(req, res, next);
    },
    (req, res, next) => {
      controller.authenticate(req, res, next);
    }
  );

  router.route('/refresh-access-token').post((req, res, next) => {
    controller.refreshAccessToken(req, res, next);
  });

  return router;
};