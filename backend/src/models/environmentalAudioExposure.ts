import { IEnvironmentalAudioExposure } from '../interfaces/IEnvironmentalAudioExposure';
import mongoose from 'mongoose';

const EnvironmentalAudioExposure = new mongoose.Schema(
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
    duration: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    hkID: {
      type: String,
      required: true
    }
  },
  {
    timeseries: {
      timeField: 'startDate',
      metaField: "userID"
    },
  }
);

export default mongoose.model<IEnvironmentalAudioExposure & mongoose.Document>(
  'EnvironmentalAudioExposure',
  EnvironmentalAudioExposure,
);
