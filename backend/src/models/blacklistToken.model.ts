import mongoose, { Document, Schema, Model } from 'mongoose';

export interface BlacklistToken extends Document {
  token: string;
  createdAt: Date;
}

const BlacklistTokenSchema: Schema<BlacklistToken> = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // 24 hours in seconds
  }
});

const BlacklistTokenModel: Model<BlacklistToken> = mongoose.model<BlacklistToken>('BlacklistToken', BlacklistTokenSchema);
export default BlacklistTokenModel;