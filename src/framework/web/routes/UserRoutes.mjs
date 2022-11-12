import express from 'express';
import { UserController } from '../../../controller/UserController.mjs';
//import UserController from '../../../controller/UserController.mjs';
import validateForm from '../middleware/SchemaValidator.mjs';

export default (dependencies) => {
  const router = express.Router();

  //const controller = UserController(dependencies);
  const controller = new UserController(dependencies);

  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.addNewUser(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getUsers(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getUser(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateUser(req, res);
      }
    )
    .delete(async (req, res) => {
      await controller.deleteUser(req, res);
    });

  router.route('/authenticate').post(
    (req, res, next) => {
      validateForm(req, res, next);
    },
    async (req, res) => {
      await controller.authenticate(req, res);
    }
  );

  router.route('/refresh-access-token').post(
    (req, res, next) => {
      validateForm(req, res, next);
    },
    async (req, res) => {
      await controller.refreshAccessToken(req, res);
    }
  );

  return router;
};
