import mongoose from 'mongoose';
import * as redis from 'redis';

export const initDB = async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log('Successfully connected to mongodb database!');

  const redisClient = redis.createClient();
  await redisClient.connect();

  console.log('Successfully connected to memory database!');

  return redisClient;
};
