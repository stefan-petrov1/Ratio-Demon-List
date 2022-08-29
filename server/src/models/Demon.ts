import { Document, model, Schema } from 'mongoose';
import validator from 'validator';

export interface IDemon {
  levelId: string;
  videoLink: string;
  thumbnailLink: string;
}

export type DemonDocument = IDemon & Document;

const userSchema = new Schema<IDemon>({
  levelId: {
    type: String,
    unique: true,
    required: [true, 'Level ID is required'],
  },
  videoLink: {
    type: String,
    required: [true, 'Video link is required'],
    validate: {
      validator: function (v: string) {
        return validator.isURL(v);
      },
      message: 'Video link must be a valid URL',
    },
  },
  thumbnailLink: {
    type: String,
    required: [true, 'Thumbnail link is required'],
    validate: {
      validator: function (v: string) {
        return validator.isURL(v);
      },
      message: 'Thumbnail link must be a valid URL',
    },
  },
});

export const Demon = model<IDemon>('Demon', userSchema);
