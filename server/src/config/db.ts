import mongoose from 'mongoose';

export const initDB = async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log('Successfully connected to the database!');
};
