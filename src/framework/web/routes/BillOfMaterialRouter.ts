import express from 'express';
import BillOfMaterialController from '../../../controller/BillOfMaterialController';
import ProjectDependencies from '../../../di/ProjectDependencies';
import validateForm from '../middleware/SchemaValidator';

export default (dependencies: ProjectDependencies) => {
  const router = express.Router();
  const controller = BillOfMaterialController(dependencies);
  router
    .route('/')
    .post(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.createBillOfMaterial(req, res);
      }
    )
    .get(async (req, res) => {
      await controller.getBillOfMaterials(req, res);
    })
    .delete(async (req, res) => {
      await controller.deleteBillOfMaterial(req, res);
    });

  router
    .route('/:id')
    .get(async (req, res) => {
      await controller.getBillOfMaterial(req, res);
    })
    .put(
      (req, res, next) => {
        validateForm(req, res, next);
      },
      async (req, res) => {
        await controller.updateBillOfMaterial(req, res);
      }
    );

  return router;
};
