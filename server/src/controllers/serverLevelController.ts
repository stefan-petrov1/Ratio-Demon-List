import { NextFunction, Request, Response } from 'express';
import ServerError from '../config/errors/ServerError';
import * as serverApiService from '../services/serverApiService';

export const getLevelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const levelId = req.params.id;

  try {
    const demon = await serverApiService.getLevel(levelId);

    if (!demon) {
      throw ServerError.badRequest('Demon not registered in the database');
    }

    res.json(demon);
  } catch (e) {
    next(e);
  }
};

export const createLevel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { levelId, videoLink, thumbnailLink } = req.body;

  try {
    await serverApiService.createLevel(levelId, videoLink, thumbnailLink);
    res.status(201).end();
  } catch (e) {
    next(e);
  }
};
