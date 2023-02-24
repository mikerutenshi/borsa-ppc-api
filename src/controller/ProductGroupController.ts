import {Request, Response} from 'express';
import CreateProductGroup from '../application/use-case/product-group/CreateProductGroup';
import DeleteProductGroup from '../application/use-case/product-group/DeleteProductGroup';
import GetAllProductGroups from '../application/use-case/product-group/GetAllProductGroups';
import GetProductGroups from '../application/use-case/product-group/GetProductGroups';
import GetProductGroup from '../application/use-case/product-group/GetProoductGroup';
import UpdateProductGroup from '../application/use-case/product-group/UpdateProductGroup';
import ProjectDependencies from '../di/ProjectDependencies';
import {ProductGroup} from '../model/Products';
import {CreatedResponse, SuccessfulResponse} from '../model/Responses';
import {createParamsFromReq, getIdsFromReq} from '../util/FilterUtil';

export default (dependencies: ProjectDependencies) => {
  const {  productGroupRepository } = dependencies.databaseService;

  const createProductGroup = async (req: Request, res: Response) => {
    const input = new ProductGroup(req.body.code, req.body.name, req.body.product_category_id);

    const result = await new CreateProductGroup(
      productGroupRepository
    ).execute(input);

    const message = 'New product group is created';
    res.status(201).json(new CreatedResponse(message, result));
  };

  const getProductGroups = async (req: Request, res: Response) => {
    if (req.query) {
      const params = createParamsFromReq(req, ['code', 'name']);
      const results = await new GetProductGroups(
        productGroupRepository
      ).execute(params);
      const message = 'Product groups are loaded';
      res.json(new SuccessfulResponse(message, results));
    } else {
      const results = await new GetAllProductGroups(
        productGroupRepository
      ).execute();
      const message = 'All product groups are loaded';
      res.json(new SuccessfulResponse(message, results));
    }
  };

  const getProductGroup = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await new GetProductGroup(
      productGroupRepository
    ).execute(id);
    const message = 'Product group is loaded';
    res.json(new SuccessfulResponse(message, result));
  };

  const updateProductGroup = async (req: Request, res: Response) => {
    const newData = new ProductGroup(req.body.code, req.body.name, req.body.product_category_id);
    newData.id = parseInt(req.params.id);
    const result = await new UpdateProductGroup(
      productGroupRepository
    ).execute(newData);
    const message = 'Product group is updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteProductGroup = async (req: Request, res: Response) => {
    const ids = getIdsFromReq(req);
    const model = new  ProductGroup('', '', 0)
    await new DeleteProductGroup(productGroupRepository).execute(ids,model);
    const message = 'Selected product groups are deleted';
    res.json(new SuccessfulResponse(message));
  };

  return {
    createProductGroup,
    getProductGroups,
    getProductGroup,
    updateProductGroup,
    deleteProductGroup,
  };
};
