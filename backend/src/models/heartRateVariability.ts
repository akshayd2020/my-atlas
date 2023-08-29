import mongoose from 'mongoose';
import { IHeartRateVariability } from '@/interfaces/IHeartRateVariability';

const HeartRateVariability = new mongoose.Schema(
  {
    userID: {
      type: String,
      index: true,
      required: true
    },
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    variability: {
      type: Number,
      required: true,
    },
    hkID: {
      type: String,
      required: true
    },
    hkWasUserEntered: {
        type: Boolean,
        required: true
    }
  },
  {
    timeseries: {
      timeField: 'startDate',
      metaField: 'userID'
    },
  }
);

export default mongoose.model<IHeartRateVariability & mongoose.Document>(
  'HeartRateVariability',
  HeartRateVariability,
);
