import express from 'express';
import ProjectDependencies from '../../../di/ProjectDependencies';
import ProductCategoryRouter from './ProductCategoryRouter';
import ProductCategoryTypeRouter from './ProductCategoryTypeRouter';
import ProductGroupRouter from './ProductGroupRouter';
import RoleRouter from './RoleRouter';
import TypeRouter from './TypeRouter';
import UserRouter from './UserRouter';

export default (dependencies: ProjectDependencies) => {
  const routes = express.Router();
  const userRouter = UserRouter(dependencies);
  const roleRouter = RoleRouter(dependencies);
  const materialTypeRouter = TypeRouter('material_type', dependencies);
  const jobTypeRouter = TypeRouter('job_type', dependencies);
  const sizeRouter = TypeRouter('size', dependencies);
  const colorRouter = TypeRouter('color', dependencies);
  const jobStatusRouter = TypeRouter('job_status', dependencies);
  const productCategoryTypeRouter = ProductCategoryTypeRouter(dependencies);
  const productCategoryRouter = ProductCategoryRouter(dependencies);
  const productGroupRouter = ProductGroupRouter(dependencies);

  routes.use('/users', userRouter);
  routes.use('/roles', roleRouter);
  routes.use('/material-types', materialTypeRouter);
  routes.use('/job-types', jobTypeRouter);
  routes.use('/sizes', sizeRouter);
  routes.use('/colors', colorRouter);
  routes.use('/job-statuses', jobStatusRouter);
  routes.use('/product-category-types', productCategoryTypeRouter);
  routes.use('/product-categories', productCategoryRouter);
  routes.use('/product-groups', productGroupRouter);

  return routes;
};
