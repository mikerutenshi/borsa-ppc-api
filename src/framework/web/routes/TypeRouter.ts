import express from 'express';
import TypeController from '../../../controller/TypeController';
import ProjectDependencies from '../../../di/ProjectDependencies';

export default (table: string, dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = TypeController(table, dependencies);

  //router
  //  .route('/')
  //  .post(
  //    (req, res, next) => {
  //      validateForm(req, res, next);
  //    },
  //    async (req, res) => {
  //      await controller.createType(req, res);
  //    }
  //  )
  //  .get(async (req, res) => {
  //    await controller.getRoles(req, res);
  //  });

  //router
  //  .route('/:id')
  //  .get(async (req, res) => {
  //    await controller.getRole(req, res);
  //  })
  //  .put(
  //    (req, res, next) => {
  //      validateForm(req, res, next);
  //    },
  //    async (req, res) => {
  //      await controller.updateRole(req, res);
  //    }
  //  )
  //  .delete(async (req, res) => {
  //    await controller.deleteRole(req, res);
  //  });

  return router;
};
