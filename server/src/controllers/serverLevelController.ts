import { NextFunction, Request, Response } from 'express';
import ServerError from '../config/errors/ServerError';
import * as serverApiService from '../services/serverApiService';
import { extractLevelBody } from './gdApiController';

export const createLevel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { levelId, videoLink } = req.body;
  levelId = Number(levelId);

  try {
    if (!levelId || !videoLink) {
      throw ServerError.badRequest('Invalid levelId or videoLink');
    }

    // Will throw error if given ID is not a valid level ID
    await extractLevelBody(levelId);
    await serverApiService.createLevel(levelId, videoLink);
    res.status(201).end();
  } catch (e) {
    next(e);
  }
};
