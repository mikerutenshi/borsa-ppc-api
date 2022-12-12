import config from '../config/config.js';
import app from './app';

const port = config.port;
const server = app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
const closeGracefully = () => {
  server.close();
  // db closed implicitly on pg-promise
  process.exit();
};

process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);
process.on('SIGUSR2', closeGracefully);
