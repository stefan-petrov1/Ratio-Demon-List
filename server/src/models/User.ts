import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';
import validator from 'validator';

export enum UserRoles {
  User = 'User',
  Admin = 'Admin',
}

export interface IPublicUser {
  username: string;
  email: string;
  role: UserRoles;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  rePassword: string;
  role?: UserRoles;
  _rePassword?: string;
}

export type UserDocument = Document & IUser;

const saltRounds = 10;

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [5, 'Username should be at least five characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (v: string) {
        return validator.isEmail(v);
      },
      message: 'Email must be a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [4, 'Password should be at least four characters long'],
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
  },
});

userSchema.pre('validate', function (next) {
  if (this.email) {
    this.email = validator.normalizeEmail(this.email, {
      all_lowercase: true,
    }) as string;
  }

  if (this.password != this.rePassword) {
    this.invalidate('password', 'Passwords must match');
  }

  next();
});

userSchema.post('validate', async function () {
  this.role = UserRoles.User;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema
  .virtual('rePassword')
  .get(function () {
    return this._rePassword;
  })
  .set(function (value) {
    this._rePassword = value;
  });

export const User = model<IUser>('User', userSchema);
