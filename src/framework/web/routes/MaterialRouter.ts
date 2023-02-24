import express from 'express';
import MaterialController from '../../../controller/MaterialController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = MaterialController(dependencies);
  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createMaterial(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getMaterials(req, res);
    })
    .delete(async (req, res) => {
      await controller.deleteMaterial(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getMaterial(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateMaterial(req, res);
      }
    );

  return router;
};
