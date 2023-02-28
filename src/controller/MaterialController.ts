import { Request, Response } from 'express';
import CreateMaterial from '../application/use-case/material/CreateMaterial';
import DeleteMaterial from '../application/use-case/material/DeleteMaterial';
import GetAllMaterials from '../application/use-case/material/GetAllMaterials';
import GetMaterial from '../application/use-case/material/GetMaterial';
import GetMaterials from '../application/use-case/material/GetMaterials';
import UpdateMaterial from '../application/use-case/material/UpdateMaterial';
import ProjectDependencies from '../di/ProjectDependencies';
import { Material } from '../model/Materials';
import { CreatedResponse, SuccessfulResponse } from '../model/Responses';
import { createParamsFromReq, getIdsFromReq } from '../util/FilterUtil';

export default (dependencies: ProjectDependencies) => {
  const { materialRepository } = dependencies.databaseService;

  const createMaterial = async (req: Request, res: Response) => {
    const input = new Material(
      req.body.name,
      req.body.attributes,
      req.body.material_group_id
    );

    const result = await new CreateMaterial(materialRepository).execute(input);

    const message = 'New material is created';
    res.status(201).json(new CreatedResponse(message, result));
  };

  const getMaterials = async (req: Request, res: Response) => {
    if (req.query) {
      const params = createParamsFromReq(req, ['name']);
      const results = await new GetMaterials(materialRepository).execute(
        params
      );
      const message = 'Materials are loaded';
      res.json(new SuccessfulResponse(message, results));
    } else {
      const results = await new GetAllMaterials(materialRepository).execute();
      const message = 'All materials are loaded';
      res.json(new SuccessfulResponse(message, results));
    }
  };

  const getMaterial = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await new GetMaterial(materialRepository).execute(id);
    const message = 'Material is loaded';
    res.json(new SuccessfulResponse(message, result));
  };

  const updateMaterial = async (req: Request, res: Response) => {
    const newData = new Material(
      req.body.name,
      req.body.attributes,
      req.body.material_group_id
    );
    newData.id = parseInt(req.params.id);
    const result = await new UpdateMaterial(materialRepository).execute(
      newData
    );
    const message = 'Material is updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteMaterial = async (req: Request, res: Response) => {
    const ids = getIdsFromReq(req);
    const model = new Material('', {}, 0);
    await new DeleteMaterial(materialRepository).execute(ids, model);
    const message = 'Selected materials are deleted';
    res.json(new SuccessfulResponse(message));
  };

  return {
    createMaterial,
    getMaterials,
    getMaterial,
    updateMaterial,
    deleteMaterial,
  };
};
