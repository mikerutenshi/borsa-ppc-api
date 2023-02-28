import { Request, Response } from 'express';
import CreateBillOfMaterial from '../application/use-case/bill-of-material/CreateBillOfMaterial';
import DeleteBillOfMaterial from '../application/use-case/bill-of-material/DeleteBillOfMaterial';
import GetAllBillOfMaterials from '../application/use-case/bill-of-material/GetAllBillOfMaterials';
import GetBillOfMaterial from '../application/use-case/bill-of-material/GetBillOfMaterial';
import GetBillOfMaterials from '../application/use-case/bill-of-material/GetBillOfMaterials';
import UpdateBillOfMaterial from '../application/use-case/bill-of-material/UpdateBillOfMaterial';
import ProjectDependencies from '../di/ProjectDependencies';
import BillOfMaterial from '../model/BillOfMaterial';
import { CreatedResponse, SuccessfulResponse } from '../model/Responses';
import { createParamsFromReq, getIdsFromReq } from '../util/FilterUtil';

export default (dependencies: ProjectDependencies) => {
  const { billOfMaterialRepository } = dependencies.databaseService;

  const createBillOfMaterial = async (req: Request, res: Response) => {
    const input = new BillOfMaterial(
      req.body.product_id,
      req.body.material_id,
      req.body.qty_req
    );

    const result = await new CreateBillOfMaterial(
      billOfMaterialRepository
    ).execute(input);

    const message = 'New bill of material is created';
    res.status(201).json(new CreatedResponse(message, result));
  };

  const getBillOfMaterials = async (req: Request, res: Response) => {
    if (req.query) {
      const params = createParamsFromReq(req, ['product_id', 'material_id']);
      const results = await new GetBillOfMaterials(
        billOfMaterialRepository
      ).execute(params);
      const message = 'Bill of materials are loaded';
      res.json(new SuccessfulResponse(message, results));
    } else {
      const results = await new GetAllBillOfMaterials(
        billOfMaterialRepository
      ).execute();
      const message = 'All bill of materials are loaded';
      res.json(new SuccessfulResponse(message, results));
    }
  };

  const getBillOfMaterial = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await new GetBillOfMaterial(
      billOfMaterialRepository
    ).execute(id);
    const message = 'Bill of material is loaded';
    res.json(new SuccessfulResponse(message, result));
  };

  const updateBillOfMaterial = async (req: Request, res: Response) => {
    const newData = new BillOfMaterial(
      req.body.product_id,
      req.body.material_id,
      req.body.qty_req
    );
    newData.id = parseInt(req.params.id);
    const result = await new UpdateBillOfMaterial(
      billOfMaterialRepository
    ).execute(newData);
    const message = 'Bill of material is updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteBillOfMaterial = async (req: Request, res: Response) => {
    const ids = getIdsFromReq(req);
    const model = new BillOfMaterial(0, 0, 0);
    await new DeleteBillOfMaterial(billOfMaterialRepository).execute(
      ids,
      model
    );
    const message = 'Selected bill of materials are deleted';
    res.json(new SuccessfulResponse(message));
  };

  return {
    createBillOfMaterial,
    getBillOfMaterials,
    getBillOfMaterial,
    updateBillOfMaterial,
    deleteBillOfMaterial,
  };
};
