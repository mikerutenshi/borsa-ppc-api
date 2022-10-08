import express from 'express';
import config from '../config/config.mjs';
import projectDependencies from './di/projectDependencies.mjs';
import ApiRouter from './framework/web/routes/index.mjs';

const app = express();
const port = config.port;
let server = null;

projectDependencies.DatabaseService.initDatabase().then(
  () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('*', (_, res) =>
      res.status(200).send({
        message: 'Welcome to BorsaPPC API.',
      })
    );

    app.use('/v2', ApiRouter(projectDependencies));

    server = app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  },
  (err) => {
    console.log(`db is not ready, err:${err}`);
  }
);

const closeGracefully = () => {
  server.close();
  process.exit();
};

process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);
process.on('SIGUSR2', closeGracefully);
