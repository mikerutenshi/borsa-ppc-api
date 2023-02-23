import express from 'express';
import RoleController from '../../../controller/RoleController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = RoleController(dependencies);

  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createRole(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getRoles(req, res);
    })
    .delete(async (req, res) => {
      await controller.deleteRole(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getRole(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateRole(req, res);
      }
    );

  return router;
};
