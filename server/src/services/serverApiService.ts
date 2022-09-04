import { Demon, DemonDocument } from '../models/Demon';

export const createLevel = (
  levelId: string,
  video: string
): Promise<DemonDocument> => {
  return Demon.create({ levelId, video });
};
