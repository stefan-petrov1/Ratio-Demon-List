import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import ServerError from '../config/errors/ServerError';
import * as authService from '../services/authService';

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.loginUser(req.body);
    const keyPair = await generateKeyPair(req, user);

    res.json({ user, ...keyPair });
  } catch (e) {
    next(e);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.createUser(req.body);
    const keyPair = await generateKeyPair(req, user);

    res.json({ user, ...keyPair });
  } catch (e) {
    next(e);
  }
};

export const getJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw ServerError.badRequest('Refresh token is required in request body');
    }

    const data = await req.redisClient.get(refreshToken);

    if (!data) {
      throw ServerError.badRequest('Invalid refresh token');
    }

    await req.redisClient.del(refreshToken);
    const keyData = await generateKeyPair(req, JSON.parse(data));
    res.json(keyData);
  } catch (e) {
    next(e);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw ServerError.badRequest('Refresh token is required in request body');
    }

    await req.redisClient.del(refreshToken);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

async function generateKeyPair(
  req: Request,
  data: any & { _id: Types.ObjectId }
): Promise<{ accessToken: string; refreshToken: string }> {
  const jwt = await authService.createJWT(data);
  const refreshToken = await authService.createRefreshToken(req, data);

  return { accessToken: jwt as string, refreshToken };
}
