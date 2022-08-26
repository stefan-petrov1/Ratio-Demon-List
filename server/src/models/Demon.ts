import { model, Schema } from 'mongoose';

interface IDemon {
  name: string;
  levelId: string;
  place: number;
}

const userSchema = new Schema<IDemon>({
  name: {
    type: String,
    required: true,
  },
  levelId: {
    type: String,
    required: true,
  },
});

export const Demon = model<IDemon>('Demon', userSchema);
