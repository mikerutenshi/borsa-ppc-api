import express from 'express';
import ProjectDependencies from './di/ProjectDependencies';
require('express-async-errors');
import ErrorHandler from './framework/web/middleware/ErrorHandler';
import ApiRouter from './framework/web/routes/index';

const app = express();

const projectDependencies = new ProjectDependencies();
projectDependencies.databaseService.initDatabase().then(
  () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/v2', ApiRouter(projectDependencies));
    app.use(ErrorHandler);
    app.get('*', (_, res) =>
      res.status(200).send({
        message: 'Welcome to BorsaPPC API.',
      })
    );
  },
  (err) => {
    console.log(`db is not ready, err:${err}`);
  }
);

export default app;
