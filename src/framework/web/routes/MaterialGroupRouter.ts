import express from 'express';
import MaterialGroupController from '../../../controller/MaterialGroupController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = MaterialGroupController(dependencies);
  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createMaterialGroup(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getMaterialGroups(req, res);
    })
    .delete(async (req, res) => {
      await controller.deleteMaterialGroup(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getMaterialGroup(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateMaterialGroup(req, res);
      }
    );

  return router;
};
