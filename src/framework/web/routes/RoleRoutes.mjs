import express from 'express';
import RoleController from '../../../controller/RoleController.mjs';
import validateForm from '../middleware/SchemaValidator.mjs';

export default (dependencies) => {
  const router = express.Router();
  const controller = RoleController(dependencies);

  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.addNewRole(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getRoles(req, res);
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
    )
    .delete(async (req, res) => {
      await controller.deleteRole(req, res);
    });

  return router;
};
