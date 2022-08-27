import { NextFunction, Request, Response } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  req.parseGdResponse = (body: string, splitter: string) => {
    let response = body.split('#')[0].split(splitter);
    let res = {};

    for (let i = 0; i < response.length; i += 2) {
      res[response[i]] = response[i + 1];
    }

    return res;
  };

  next();
}
