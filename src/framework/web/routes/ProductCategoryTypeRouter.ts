import express from 'express';
import ProductCategoryTypeController from '../../../controller/ProductCategoryTypeController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = ProductCategoryTypeController(dependencies);
  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createProductCategoryType(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getProductCategoryTypes(req, res);
    })
    .delete(async (req, res) => {
      await controller.deleteProductCategoryType(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getProductCategoryType(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateProductCategoryType(req, res);
      }
    );

  return router;
};
