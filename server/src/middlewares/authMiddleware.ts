import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import ServerError from '../config/errors/ServerError';
import { IPublicUser, UserRoles } from '../models/User';
import { jwtVerify } from '../utils/jwtUtils';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['x-authorization'] as string | undefined;

  if (!token) {
    return next();
  }

  try {
    const { iat, exp, ...userData }: IPublicUser & JwtPayload =
      await jwtVerify<IPublicUser>(token);

    req.user = userData;
    req.isAuthenticated = Boolean(userData);
  } catch (e) {
    req.isAuthenticated = false;
  }

  next();
};

export const allowGuest = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated) {
    return next(
      ServerError.badRequest('User must be logged out to perform this action')
    );
  }

  next();
};

export const allowUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated) {
    return next(
      ServerError.badRequest('User must be logged in to perform this action')
    );
  }

  next();
};

export const allowAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.isAuthenticated ||
    (req.isAuthenticated && req.user.role !== UserRoles.Admin)
  ) {
    return next(
      ServerError.badRequest('User must be an admin to perform this action')
    );
  }

  next();
};
