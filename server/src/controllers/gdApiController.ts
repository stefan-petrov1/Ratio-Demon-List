import { NextFunction, Request, Response } from 'express';
import ServerError from '../config/errors/ServerError';
import levelFactory from '../factories/levelFactory';
import { TGdResponseParser } from '../middlewares/attachGdResponseParser/types';
import * as gdApiService from '../services/gdApiService';

export async function getLevelById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const levelId = Number(req.params.id.trim());

  try {
    const level = await extractLevelData(levelId, req.parseGdResponse);
    res.send(level);
  } catch (err) {
    next(err);
  }
}

export const extractLevelBody = async (levelId: number): Promise<string> => {
  if (!levelId) throw ServerError.badRequest('Invalid GD level ID');

  const data: string = await gdApiService.getLevelById(levelId);

  // Data will be -1 as long as the ID is a number
  if (data === '-1') {
    throw ServerError.badRequest('Invalid ID');
  }

  return data;
};

export const extractLevelData = async (
  levelId: number,
  parseGdResponse: TGdResponseParser
) => {
  const data = await extractLevelBody(levelId);

  const splitBody: string[] = data.split('#');

  const preRes = splitBody[0].split('|', 10);
  const author = splitBody[1].split('|')[0].split(':');
  const song = parseGdResponse(splitBody[2], '~|~');

  const levelInfo = preRes.find((x) => x.startsWith(`1:${levelId}`));
  const response = parseGdResponse(levelInfo, ':');

  return levelFactory(response, song, author);
};
