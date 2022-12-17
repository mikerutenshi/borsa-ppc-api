import express from 'express';
import ProjectDependencies from '../../../di/ProjectDependencies';
import UserRouter from './UserRoutes';
import RoleRouter from './RoleRoutes';

export default (dependencies: ProjectDependencies) => {
  const routes = express.Router();
  const userRouter = UserRouter(dependencies);
  const roleRouter = RoleRouter(dependencies);

  routes.use('/users', userRouter);
  routes.use('/roles', roleRouter);

  return routes;
};
