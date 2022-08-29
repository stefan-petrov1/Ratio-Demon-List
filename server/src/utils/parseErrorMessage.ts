import mongoose from 'mongoose';

interface IError {
  message: string;
  [k: string]: any;
}

export const isMongooseUniqueError = (error: IError): boolean => {
  return (
    error.name &&
    error.code &&
    error.name === 'MongoServerError' &&
    error.code === 11000
  );
};

export const parseErrorMessage = (error: IError) => {
  let message = error.message;

  if (error instanceof mongoose.Error.ValidationError) {
    message = Object.values(error.errors)
      .map((x) => x.message)
      .join(', ');
  }

  if (isMongooseUniqueError(error)) {
    const propName: string = Object.keys(error.keyPattern)[0];
    message = `${propName} must be unique`;
  }

  return message;
};
