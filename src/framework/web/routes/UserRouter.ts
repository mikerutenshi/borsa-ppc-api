import express from 'express';
import UserController from '../../../controller/UserController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = UserController(dependencies);

  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createUser(req, res);
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
      await controller.deleteUsers(req, res);
    });

  router.route('/authenticate').post(
    (req, res, next) => {
      validateForm(req, res, next);
    },
    async (req, res) => {
      await controller.authUser(req, res);
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
