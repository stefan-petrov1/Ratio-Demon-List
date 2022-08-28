import dotenv from 'dotenv';
import express, { Express } from 'express';
import path from 'path';
import { routes } from './config/routes';
import attachGdResponseParser from './middlewares/attachGdResponseParser';
import serverErrorHandler from './middlewares/serverErrorHandler';

dotenv.config({
  path: path.resolve(__dirname, `../envs/.env.${process.env.NODE_ENV}`),
});

const app: Express = express();
const port: string = process.env.PORT;

app.use(attachGdResponseParser);
app.use('/api', routes);
app.use(serverErrorHandler);

async function start() {
  // No need for now
  // await initDB();

  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });
}

start();
