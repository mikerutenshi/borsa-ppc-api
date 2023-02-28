import { Request, Response } from 'express';
import CreateLabourCost from '../application/use-case/labour-cost/CreateLabourCost';
import DeleteLabourCost from '../application/use-case/labour-cost/DeleteLabourCost';
import GetAllLabourCosts from '../application/use-case/labour-cost/GetAllLabourCosts';
import GetLabourCost from '../application/use-case/labour-cost/GetLabourCost';
import GetLabourCosts from '../application/use-case/labour-cost/GetLabourCosts';
import UpdateLabourCost from '../application/use-case/labour-cost/UpdateLabousCost';
import ProjectDependencies from '../di/ProjectDependencies';
import LabourCost from '../model/LabourCost';
import { CreatedResponse, SuccessfulResponse } from '../model/Responses';
import { createParamsFromReq, getIdsFromReq } from '../util/FilterUtil';

export default (dependencies: ProjectDependencies) => {
  const { labourCostRepository } = dependencies.databaseService;

  const createLabourCost = async (req: Request, res: Response) => {
    const input = new LabourCost(
      req.body.product_group_id,
      req.body.job_type_id,
      req.body.cost
    );

    const result = await new CreateLabourCost(labourCostRepository).execute(
      input
    );

    const message = 'New Labour cost is created';
    res.status(201).json(new CreatedResponse(message, result));
  };

  const getLabourCosts = async (req: Request, res: Response) => {
    if (req.query) {
      const params = createParamsFromReq(req, [
        'product_group_id',
        'job_type_id',
      ]);
      const results = await new GetLabourCosts(labourCostRepository).execute(
        params
      );
      const message = 'Labour costs are loaded';
      res.json(new SuccessfulResponse(message, results));
    } else {
      const results = await new GetAllLabourCosts(
        labourCostRepository
      ).execute();
      const message = 'All Labour costs are loaded';
      res.json(new SuccessfulResponse(message, results));
    }
  };

  const getLabourCost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await new GetLabourCost(labourCostRepository).execute(id);
    const message = 'Labour cost is loaded';
    res.json(new SuccessfulResponse(message, result));
  };

  const updateLabourCost = async (req: Request, res: Response) => {
    const newData = new LabourCost(
      req.body.product_group_id,
      req.body.job_type_id,
      req.body.cost
    );
    newData.id = parseInt(req.params.id);
    const result = await new UpdateLabourCost(labourCostRepository).execute(
      newData
    );
    const message = 'Labour cost is updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteLabourCost = async (req: Request, res: Response) => {
    const ids = getIdsFromReq(req);
    const model = new LabourCost(0, 0, 0);
    await new DeleteLabourCost(labourCostRepository).execute(ids, model);
    const message = 'Selected Labour costs are deleted';
    res.json(new SuccessfulResponse(message));
  };

  return {
    createLabourCost,
    getLabourCosts,
    getLabourCost,
    updateLabourCost,
    deleteLabourCost,
  };
};
