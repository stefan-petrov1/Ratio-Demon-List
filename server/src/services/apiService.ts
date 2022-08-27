import { gdRequest } from './gdRequester';

export async function getLevelById(id: string): Promise<string> {
  const data = await gdRequest('getGJLevels21', {
    str: id,
    type: 0,
  });

  return data;
}
