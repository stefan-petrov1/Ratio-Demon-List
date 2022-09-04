import { Demon } from '../models/Demon';

export const getLevel = (levelId: string | number) => {
  return Demon.findOne({ levelId }).lean();
};
