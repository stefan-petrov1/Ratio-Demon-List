import { NextFunction, Request, Response } from 'express';
import levelFactory from '../factories/levelFactory';
import { ILevel } from '../factories/levelFactory/types';
import * as apiService from '../services/apiService';

export async function getLevelById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const levelId = req.params.id;

  try {
    if (!levelId) throw new Error('Invalid ID');

    const data = await apiService.getLevelById(levelId);

    const splitBody: string[] = data.split('#');

    const preRes = splitBody[0].split('|', 10);
    const author = splitBody[1].split('|')[0].split(':');
    const song = req.parseGdResponse(splitBody[2], '~|~');

    const levelInfo = preRes.find((x) => x.startsWith(`1:${levelId}`));
    const response = req.parseGdResponse(levelInfo, ':');

    const level: ILevel = levelFactory(response, song, author);
    res.send(level);
  } catch (err) {
    next(err);
  }
}
