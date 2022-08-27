import { TGdResponseParser } from '../../middlewares/attachGdResponseParser/types';

export {};

declare global {
  namespace Express {
    export interface Request {
      parseGdResponse: TGdResponseParser;
    }
  }
}
