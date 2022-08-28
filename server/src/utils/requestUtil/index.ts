import request, { Response } from 'request';
import { IReturnData, RequestMethods } from './types';

export default function requester<T>(
  method: RequestMethods,
  url: string,
  params?: Object
): Promise<IReturnData<T>> {
  return new Promise((resolve, reject) => {
    const handler = function (err: any, response: Response, body: T) {
      if (err) {
        return reject(err);
      }

      resolve({ response, body });
    };

    if (params) {
      request[method](url, params, handler);
    } else {
      request[method](url, handler);
    }
  });
}
