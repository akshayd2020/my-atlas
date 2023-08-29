import { IHeadphoneAudioExposure } from '../interfaces/IHeadphoneAudioExposure';
import mongoose from 'mongoose';
//no error when line one is " '@/interfaces/IHeadPhoneExposure' " ... just changed file name

const HeadphoneAudioExposure = new mongoose.Schema(
  {
    userID: {
      type: String,
      index: true,
      required: true,
    },
    startDate: {
      type: Date,
      index: true,
      required: true,
    },
    duration: {
      type: Number,
      index: true,
      required: true,
    },
    value: {
      type: Number,
      index: true,
      required: true,
    },
    hkID: {
      type: String,
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

export default mongoose.model<IHeadphoneAudioExposure & mongoose.Document>(
  'HeadphoneAudioExposure',
  HeadphoneAudioExposure,
);
