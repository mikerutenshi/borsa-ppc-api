import express from 'express';
import LabourCostController from '../../../controller/LabourCostController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = LabourCostController(dependencies);
  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createLabourCost(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getLabourCosts(req, res);
    })
    .delete(async (req, res) => {
      await controller.deleteLabourCost(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getLabourCost(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateLabourCost(req, res);
      }
    );

  return router;
};
