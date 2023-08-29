import { IGPS } from '@/interfaces/IGPS';
import { timeStamp } from 'console';
import mongoose from 'mongoose';

const GPS = new mongoose.Schema(
  {
    timestamp: { type: Date, require: true },
    userID: { type: String, require: true },
    latitude: Number, // not sure if this should be a number or not, in expo it returns a number
    longitude: Number,
    altitude: Number,
    accuracy: Number,
  },
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'userID',
    },
  },
);

export default mongoose.model<IGPS & mongoose.Document>('GPS', GPS);
