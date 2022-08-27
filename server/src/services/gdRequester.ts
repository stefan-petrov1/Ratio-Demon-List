import request, { Response } from 'request';

/*
################################################ QUICK NOTE ################################################
All the parsing and requester have been copied and refactored from GD Colon's GDbrowser project.
The link to GD Colon's project repo is: https://github.com/GDColon/GDBrowser.
For any business problems or bugs please DM me via Discord at: StefanDP#6411.
################################################ QUICK NOTE ################################################
*/

const baseUrl = 'http://www.boomlings.com/database';

type Callback = {
  (error: boolean);
  (response: any);
  (body: any);
};

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
  params = {},
  callback: Callback = () => {}
) => {
  if (!target) return callback(true);
  const requestURL = `${baseUrl}/${target}.php`;
  const requestParams = parseGdParams(params);

  return new Promise((resolve, reject) => {
    request.post(requestURL, requestParams, (err, res: Response, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body);
    });
  });
};
