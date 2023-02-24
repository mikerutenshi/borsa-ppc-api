import express from 'express';
import TypeController from '../../../controller/TypeController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (table: string, dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = TypeController(table, dependencies);

  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createType(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getTypes(req, res);
    })
    .delete(async (req, res) => {
      await controller.deleteType(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getType(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateType(req, res);
      }
    );

  return router;
};
