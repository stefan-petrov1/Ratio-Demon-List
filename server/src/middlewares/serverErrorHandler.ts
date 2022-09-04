import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logger from 'npmlog';
import ServerError from '../config/errors/ServerError';
import {
  isMongooseUniqueError,
  parseErrorMessage,
} from '../utils/parseErrorMessage';

export default function (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    error instanceof ServerError ||
    error instanceof mongoose.Error.ValidationError ||
    isMongooseUniqueError(error)
  ) {
    const message = parseErrorMessage(error);
    const code = error instanceof ServerError ? error.code : 404;

    return res.status(code).json({ code, message });
  }

  logger.error(
    'INTERNAL ERROR >> ',
    JSON.stringify(error, Object.getOwnPropertyNames(error))
  );

  const newError = ServerError.serverError();

  res
    .status(newError.code)
    .json({ status: newError.code, message: newError.message });
}
