import { NextFunction, Request, Response } from 'express';
import ServerError from '../config/errors/ServerError';
import * as apiService from '../services/apiService';
import { extractLevelData } from './gdApiController';

export const getByLevelId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const levelId = Number(req.params.id.trim());
    const levelFromDb = await apiService.getLevel(levelId);

    if (!levelFromDb) {
      throw ServerError.badRequest('Demon not registered in the database');
    }

    const { _id, ...parsedLevelFromDb } = levelFromDb;

    const levelFromGd = await extractLevelData(levelId, req.parseGdResponse);
    Object.assign(levelFromGd, parsedLevelFromDb);

    res.send(levelFromGd);
  } catch (e) {
    next(e);
  }
};
