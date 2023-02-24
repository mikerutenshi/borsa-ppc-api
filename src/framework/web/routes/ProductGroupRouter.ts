import express from 'express';
import ProductGroupController from '../../../controller/ProductGroupController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = ProductGroupController(dependencies);
  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createProductGroup(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getProductGroups(req, res);
    })
    .delete(async (req, res) => {
      await controller.deleteProductGroup(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getProductGroup(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateProductGroup(req, res);
      }
    );

  return router;
};
