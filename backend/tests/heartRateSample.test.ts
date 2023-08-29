import { IHeartRateSampleAverage, IHeartRateSample, IHeartRateSampleDTO } from '@/interfaces/IHeartRateSample';
import HeartRateSampleService from '@/services/heartRateSample';
import HeartRateSample from '@/models/heartRateSample';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';

// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const heartRateSampleService = new HeartRateSampleService(HeartRateSample, LoggerInstance, eventDispatcher);

describe('Test average multiple heart rate', () => {
  it('Add document', async done => {
    const dateRightNow = new Date();
    const earlierDate = new Date(2020, 8, 8, 8);
    const heartRateExample: IHeartRateSampleDTO[] = [
      {
        userID: '54321',
        startDate: dateRightNow,
        duration: 20,
        bpm: 100,
        hkID: '51134',
        hkWasUserEntered: false,
      },
      {
        userID: '54321',
        startDate: earlierDate,
        duration: 20,
        bpm: 50,
        hkID: '53425',
        hkWasUserEntered: false,
      },
    ];
    const { heartRateMany } = await heartRateSampleService.addManyHeartRateSample(
      heartRateExample,
    );
    const averageHeartRate : IHeartRateSampleAverage = await heartRateSampleService.getAverageHeartRateSampleByDateRange(
      '54321',
      earlierDate,
      dateRightNow,
    );
    expect(averageHeartRate.averageBPM).toEqual(75);
    done();
  });
});
