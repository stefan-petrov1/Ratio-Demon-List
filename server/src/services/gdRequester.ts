import requester from '../utils/requestUtil';
import { IReturnData, RequestMethods } from '../utils/requestUtil/types';

/*
################################################ QUICK NOTE ################################################
All the parsing and requester have been copied and refactored from GD Colon's GDbrowser project.
The link to GD Colon's project repo is: https://github.com/GDColon/GDBrowser.
For any business problems or bugs please DM me via Discord at: StefanDP#6411.
################################################ QUICK NOTE ################################################
*/

const baseUrl = 'http://www.boomlings.com/database';

const defaultParams = {
  secret: 'Wmfd2893gb7',
  gameVersion: '21',
  binaryVersion: '35',
};

const parseGdParams = (params: Object) => {
  Object.assign(params, defaultParams);
  return { form: params, headers: {} };
};

export const gdRequest = async (
  target?: string,
  params = {}
): Promise<IReturnData<string>> => {
  if (!target) throw new Error('No target provided in gd request.');

  const requestURL = `${baseUrl}/${target}.php`;
  const requestParams = parseGdParams(params);

  return requester<string>(RequestMethods.post, requestURL, requestParams);
};
