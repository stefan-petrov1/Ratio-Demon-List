import { NextFunction, Request, Response } from 'express';
import logger from 'npmlog';
import ServerError from '../../config/errors/ServerError';

export default function (
  error: Object,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ServerError) {
    return res.json({ status: error.code, message: error.message });
  }

  logger.error(
    'INTERNAL ERROR >> ',
    JSON.stringify(error, Object.getOwnPropertyNames(error))
  );

  const newError = ServerError.serverError();
  res.json({ status: newError.code, message: newError.message });
}
