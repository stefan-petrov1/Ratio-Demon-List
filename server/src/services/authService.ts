import bcrypt from 'bcrypt';
import { Request } from 'express';
import { Types } from 'mongoose';
import { v4 } from 'uuid';
import ServerError from '../config/errors/ServerError';
import { IUser, User } from '../models/User';
import { jwtSign } from '../utils/jwtUtils';

export async function createUser(data: IUser) {
  const user = await User.create(data);
  return user.toObject();
}

export async function loginUser({ email, password }) {
  if (!email || !password) {
    throw ServerError.badRequest('Missing email or password');
  }

  const foundUser = await User.findOne({ email }).lean();

  if (
    !foundUser ||
    (foundUser && !(await bcrypt.compare(password, foundUser.password)))
  ) {
    throw ServerError.badRequest('Invalid email or password');
  }

  return foundUser;
}

// JWT expire in 2 hours.
export function createJWT(user: any) {
  const { __v, password, ...publicData } = user;

  return jwtSign(publicData, {
    expiresIn: '2h',
  });
}

// Refresh tokens expire in 24 hours
export async function createRefreshToken(
  req: Request,
  data: { _id: Types.ObjectId; [key: string]: any }
) {
  const tokenKey = `rt_${data._id}${v4()}${Date.now()}`;

  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + 24);

  await req.redisClient.set(tokenKey, JSON.stringify(data));
  await req.redisClient.expireAt(tokenKey, expireDate);

  return tokenKey;
}
