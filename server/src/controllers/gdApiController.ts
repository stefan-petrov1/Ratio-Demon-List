import { NextFunction, Request, Response } from 'express';
import ServerError from '../config/errors/ServerError';
import levelFactory from '../factories/levelFactory';
import { ILevel } from '../factories/levelFactory/types';
import * as gdApiService from '../services/gdApiService';

export async function getLevelById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const levelId = Number(req.params.id.trim());

  try {
    if (!levelId) throw ServerError.badRequest('Invalid ID');

    const data = await gdApiService.getLevelById(levelId);
    console.log(levelId, data);

    // Data will be -1 as long as the ID is a number
    if (data === '-1') {
      throw ServerError.badRequest('Invalid ID');
    }

    const splitBody: string[] = data.split('#');

    const preRes = splitBody[0].split('|', 10);
    const author = splitBody[1].split('|')[0].split(':');
    const song = req.parseGdResponse(splitBody[2], '~|~');

    const levelInfo = preRes.find((x) => x.startsWith(`1:${levelId}`));
    const response = req.parseGdResponse(levelInfo, ':');

    const level: ILevel = await levelFactory(response, song, author);
    res.send(level);
  } catch (err) {
    next(err);
  }
}
