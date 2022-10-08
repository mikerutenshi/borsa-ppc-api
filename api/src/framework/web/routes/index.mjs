import express from 'express';
import UserRouter from './UserRoutes.mjs';

export default (dependencies) => {
  const routes = express.Router();
  const userRouter = UserRouter(dependencies);

  routes.use('/users', userRouter);

  return routes;
};
