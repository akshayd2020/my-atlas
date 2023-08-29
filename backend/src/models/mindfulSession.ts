import { IMindfulSession } from '../interfaces/IMindfulSession';
import mongoose from 'mongoose';

const MindfulSession = new mongoose.Schema(
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
    duration: {
      type: Number,
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

export default mongoose.model<IMindfulSession & mongoose.Document>('MindfulSession', MindfulSession);
