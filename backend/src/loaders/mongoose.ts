import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '@/config';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL, {
    user: encodeURIComponent('root'),
    pass: encodeURIComponent('password')
  });
  return connection.connection.db;
};
