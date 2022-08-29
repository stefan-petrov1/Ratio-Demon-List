import { NextFunction, Request, Response } from 'express';
import { RedisClientType } from 'redis';

export const attachRedisClient =
  (redisClient: RedisClientType) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.redisClient = redisClient;
    next();
  };
