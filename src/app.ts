import express from 'express';
require('express-async-errors');
import projectDependencies from './di/projectDependencies';
import ErrorHandler from './framework/web/middleware/ErrorHandler.mjs';
import ApiRouter from './framework/web/routes/index.mjs';

const app = express();

projectDependencies.DatabaseService.initDatabase().then(
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
