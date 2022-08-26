import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, `../envs/.env.${process.env.NODE_ENV}`),
});

const app: Express = express();
const port: string = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
