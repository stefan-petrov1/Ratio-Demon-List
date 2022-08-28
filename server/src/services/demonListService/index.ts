import requester from '../../utils/requestUtil';
import { RequestMethods } from '../../utils/requestUtil/types';
import { IPositionLevelData } from './types';

const baseUrl = 'https://pointercrate.com/api/v2';

const endpoints = {
  demons: '/demons',
};

export async function getPositionByName(
  name: string | number
): Promise<IPositionLevelData[]> {
  const url = `${baseUrl}${endpoints.demons}/?name=${encodeURIComponent(name)}`;
  const data = await requester<string>(RequestMethods.get, url);

  return JSON.parse(data.body);
}
