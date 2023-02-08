import express from 'express';
import ProductCategoryController from '../../../controller/ProductCategoryController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = ProductCategoryController(dependencies);
  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createProductCategory(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getProductCategories(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getProductCategory(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateProductCategory(req, res);
      }
    )
    .delete(async (req, res) => {
      await controller.deleteProductCategory(req, res);
    });

  return router;
};
