import express from 'express';
import UserRouter from './UserRoutes.mjs';
import RoleRouter from './RoleRoutes.mjs';

export default (dependencies) => {
  const routes = express.Router();
  const userRouter = UserRouter(dependencies);
  const roleRouter = RoleRouter(dependencies);

  routes.use('/users', userRouter);
  routes.use('/roles', roleRouter);

  return routes;
};
