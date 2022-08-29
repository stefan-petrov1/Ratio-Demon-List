import { Demon, DemonDocument } from '../models/Demon';

export const getLevel = (levelId: string) => {
  return Demon.findOne({ levelId }).lean();
};

export const createLevel = (
  levelId: string,
  videoLink: string,
  thumbnailLink: string
): Promise<DemonDocument> => {
  return Demon.create({ levelId, videoLink, thumbnailLink });
};
