import { Request, Response } from 'express';
import CreateProduct from '../application/use-case/product/CreateProduct';
import DeleteProduct from '../application/use-case/product/DeleteProduct';
import GetAllProducts from '../application/use-case/product/GetAllProducts';
import GetProducts from '../application/use-case/product/GetProducts';
import GetProduct from '../application/use-case/product/GetProoduct';
import UpdateProduct from '../application/use-case/product/UpdateProduct';
import ProjectDependencies from '../di/ProjectDependencies';
import { Product } from '../model/Products';
import { CreatedResponse, SuccessfulResponse } from '../model/Responses';
import { createParamsFromReq, getIdsFromReq } from '../util/FilterUtil';

export default (dependencies: ProjectDependencies) => {
  const { productRepository } = dependencies.databaseService;

  const createProduct = async (req: Request, res: Response) => {
    const input = new Product(
      req.body.code,
      req.body.product_group_id,
      req.body.attributes
    );

    const result = await new CreateProduct(productRepository).execute(input);

    const message = 'New product is created';
    res.status(201).json(new CreatedResponse(message, result));
  };

  const getProducts = async (req: Request, res: Response) => {
    if (req.query) {
      const params = createParamsFromReq(req, ['code']);
      const results = await new GetProducts(productRepository).execute(params);
      const message = 'Products are loaded';
      res.json(new SuccessfulResponse(message, results));
    } else {
      const results = await new GetAllProducts(productRepository).execute();
      const message = 'All products are loaded';
      res.json(new SuccessfulResponse(message, results));
    }
  };

  const getProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await new GetProduct(productRepository).execute(id);
    const message = 'Product is loaded';
    res.json(new SuccessfulResponse(message, result));
  };

  const updateProduct = async (req: Request, res: Response) => {
    const newData = new Product(
      req.body.code,
      req.body.product_group_id,
      req.body.attributes
    );
    newData.id = parseInt(req.params.id);
    const result = await new UpdateProduct(productRepository).execute(newData);
    const message = 'Product is updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteProduct = async (req: Request, res: Response) => {
    const ids = getIdsFromReq(req);
    const model = new Product('', 0, {});
    await new DeleteProduct(productRepository).execute(ids, model);
    const message = 'Selected products are deleted';
    res.json(new SuccessfulResponse(message));
  };

  return {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
  };
};
