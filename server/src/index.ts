import dotenv from 'dotenv';
import express, { Express } from 'express';
import path from 'path';
import { initDB } from './config/db';
import { routes } from './config/routes';

dotenv.config({
  path: path.resolve(__dirname, `../envs/.env.${process.env.NODE_ENV}`),
});

const app: Express = express();
const port: string = process.env.PORT;

app.use('/api', routes);

async function start() {
  await initDB();

  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });
}

start();
