import jwt from 'jsonwebtoken';

export const jwtSign = (value: any, options = {}) =>
  new Promise((resolve, reject) => {
    jwt.sign(value, process.env.JWT_SECRET, options, (err, signedValue) => {
      if (err) {
        reject(err);
      } else {
        resolve(signedValue);
      }
    });
  });

export const jwtVerify = <T>(
  token: string,
  options = {}
): Promise<T & jwt.JwtPayload> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, options, (err, decodedValue) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedValue as T & jwt.JwtPayload);
      }
    });
  });
