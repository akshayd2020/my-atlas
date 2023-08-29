import { IRestingHeartRate } from '@/interfaces/IRestingHeartRate';
import mongoose from 'mongoose';

const RestingHeartRate = new mongoose.Schema(
  {
    userID: {
      type: String,
      index: true,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    bpm: {
      type: Number,
      required: true,
    },
    hkID: {
      type: String,
      required: true,
    },
    hkWasUserEntered: {
      type: Boolean,
      required: true,
    },
  },
  {
    timeseries: {
      timeField: 'startDate',
      metaField: 'userID',
    },
  },
);

export default mongoose.model<IRestingHeartRate & mongoose.Document>('RestingHeartRate', RestingHeartRate);
