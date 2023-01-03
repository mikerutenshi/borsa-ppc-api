import express from 'express';
import ProjectDependencies from '../../../di/ProjectDependencies';
import UserRouter from './UserRouter';
import RoleRouter from './RoleRouter';
import TypeRouter from './TypeRouter';

export default (dependencies: ProjectDependencies) => {
  const routes = express.Router();
  const userRouter = UserRouter(dependencies);
  const roleRouter = RoleRouter(dependencies);
  const prodCatTypeRouter = TypeRouter('product_category_type', dependencies);
  const materialTypeRouter = TypeRouter('material_type', dependencies);
  const jobTypeRouter = TypeRouter('job_type', dependencies);
  const sizeRouter = TypeRouter('size', dependencies);
  const colorRouter = TypeRouter('color', dependencies);

  routes.use('/users', userRouter);
  routes.use('/roles', roleRouter);
  routes.use('/product-category-types', prodCatTypeRouter);
  routes.use('/material-types', materialTypeRouter);
  routes.use('/job-types', jobTypeRouter);
  routes.use('/sizes', sizeRouter);
  routes.use('/colors', colorRouter);

  return routes;
};
