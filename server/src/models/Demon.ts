import { Document, model, Schema } from 'mongoose';
import validator from 'validator';

export interface IDemon {
  levelId: string;
  video: string;
}

export type DemonDocument = IDemon & Document;

const demonSchema = new Schema<IDemon>({
  levelId: {
    type: String,
    unique: true,
    required: [true, 'Level ID is required'],
  },
  video: {
    type: String,
    required: [true, 'Video link is required'],
    validate: {
      validator: function (v: string) {
        return validator.isURL(v);
      },
      message: 'Video link must be a valid URL',
    },
  },
});

export const Demon = model<IDemon>('Demon', demonSchema);
