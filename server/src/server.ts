import dotenv from 'dotenv';
import express, { Express } from 'express';
import path from 'path';
import { RedisClientType } from 'redis';
import { initDB } from './config/db';
import attachGdResponseParser from './middlewares/attachGdResponseParser';
import { attachRedisClient } from './middlewares/attachRedisClient';
import serverErrorHandler from './middlewares/serverErrorHandler';
import { routes } from './routers/routes';

dotenv.config({
  path: path.resolve(__dirname, `../envs/.env.${process.env.NODE_ENV}`),
});

const app: Express = express();
const port: string = process.env.PORT;

async function start() {
  const redisClient = await initDB();

  app.use(attachRedisClient(redisClient as RedisClientType));
  app.use(attachGdResponseParser);
  app.use('/api', routes);
  app.use(serverErrorHandler);

  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });
}

start();
