import { Request, Response } from 'express';
import CreateMaterialGroup from '../application/use-case/material-group/CreateMaterialtGroup';
import DeleteMaterialGroup from '../application/use-case/material-group/DeleteMaterialGroup';
import GetAllMaterialGroups from '../application/use-case/material-group/GetAllMaterialGroups';
import GetMaterialGroup from '../application/use-case/material-group/GetMaterialGroup';
import GetMaterialGroups from '../application/use-case/material-group/GetMaterialGroups';
import UpdateMaterialGroup from '../application/use-case/material-group/UpdateMaterialGroup';
import ProjectDependencies from '../di/ProjectDependencies';
import { MaterialGroup } from '../model/Materials';
import { CreatedResponse, SuccessfulResponse } from '../model/Responses';
import { createParamsFromReq, getIdsFromReq } from '../util/FilterUtil';

export default (dependencies: ProjectDependencies) => {
  const { materialGroupRepository } = dependencies.databaseService;

  const createMaterialGroup = async (req: Request, res: Response) => {
    const input = new MaterialGroup(req.body.name, req.body.material_type_id);

    const result = await new CreateMaterialGroup(
      materialGroupRepository
    ).execute(input);

    const message = 'New material group is created';
    res.status(201).json(new CreatedResponse(message, result));
  };

  const getMaterialGroups = async (req: Request, res: Response) => {
    if (req.query) {
      const params = createParamsFromReq(req, ['name']);
      const results = await new GetMaterialGroups(
        materialGroupRepository
      ).execute(params);
      const message = 'Material groups are loaded';
      res.json(new SuccessfulResponse(message, results));
    } else {
      const results = await new GetAllMaterialGroups(
        materialGroupRepository
      ).execute();
      const message = 'All material groups are loaded';
      res.json(new SuccessfulResponse(message, results));
    }
  };

  const getMaterialGroup = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await new GetMaterialGroup(materialGroupRepository).execute(
      id
    );
    const message = 'Material group is loaded';
    res.json(new SuccessfulResponse(message, result));
  };

  const updateMaterialGroup = async (req: Request, res: Response) => {
    const newData = new MaterialGroup(req.body.name, req.body.material_type_id);
    newData.id = parseInt(req.params.id);
    const result = await new UpdateMaterialGroup(
      materialGroupRepository
    ).execute(newData);
    const message = 'Material group is updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteMaterialGroup = async (req: Request, res: Response) => {
    const ids = getIdsFromReq(req);
    const model = new MaterialGroup('', 0);
    await new DeleteMaterialGroup(materialGroupRepository).execute(ids, model);
    const message = 'Selected material groups are deleted';
    res.json(new SuccessfulResponse(message));
  };

  return {
    createMaterialGroup,
    getMaterialGroups,
    getMaterialGroup,
    updateMaterialGroup,
    deleteMaterialGroup,
  };
};
