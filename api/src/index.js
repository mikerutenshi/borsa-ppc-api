import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.get('*', (_, res) =>
  res.status(200).send({
    message: 'Welcome to this API.',
  })
);

const server = app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
const closeGracefully = () => {
  server.close();
  process.exit();
};
process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);
process.on('SIGUSR2', closeGracefully);
