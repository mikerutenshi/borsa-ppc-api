import express from 'express';
import ProductController from '../../../controller/ProductController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = ProductController(dependencies);
  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createProduct(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getProducts(req, res);
    })
    .delete(async (req, res) => {
      await controller.deleteProduct(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getProduct(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateProduct(req, res);
      }
    );

  return router;
};
