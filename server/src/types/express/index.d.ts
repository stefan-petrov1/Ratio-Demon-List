import { RedisClientType } from 'redis';
import { TGdResponseParser } from '../../middlewares/attachGdResponseParser/types';
import { IPublicUser } from '../../models/User';

export {};

declare global {
  namespace Express {
    export interface Request {
      parseGdResponse: TGdResponseParser;
      redisClient: RedisClientType;
      isAuthenticated: boolean;
      user: undefined | IPublicUser;
    }
  }
}
