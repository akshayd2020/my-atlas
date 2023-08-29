import { ISleepSampleDTO, ISleepSampleSum } from '@/interfaces/ISleepSample';
import SleepSampleService from '@/services/sleepSample';
import SleepSample from '@/models/sleepSample';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const SleepSampleServiceInstance = new SleepSampleService(SleepSample, LoggerInstance, eventDispatcher);

describe('Add SleepSample document to database', () => {
  it('Add document', async done => {
    const dateRightNow = new Date();
    const earlierDate = new Date(2020, 8, 8, 8);

    const sleepSampleExample: ISleepSampleDTO[] = [
      {
        userID: '12345',
        startDate: dateRightNow,
        duration: 100,
        sleepState: 'Shnocked',
      },
      {
        userID: '12345',
        startDate: earlierDate,
        duration: 50,
        sleepState: 'Shnocked',
      },
    ];
    await SleepSampleServiceInstance.addManySleepSample(sleepSampleExample);
    const sleepSampleSum: ISleepSampleSum = await SleepSampleServiceInstance.getSumSleepSample(
      '12345',
      'Shnocked',
      earlierDate,
      dateRightNow,
    );
    console.log(sleepSampleSum);

    const sleepSampleFromDB = await SleepSampleServiceInstance.getSleepSampleByDateRange(
      '12345',
      earlierDate,
      dateRightNow,
    );
    expect(sleepSampleFromDB[0].userID).toEqual('12345');
    expect(sleepSampleFromDB[0].startDate).toEqual(earlierDate);
    expect(sleepSampleFromDB[0].duration).toEqual(50);
    expect(sleepSampleFromDB[0].sleepState).toEqual('Shnocked');
    expect(sleepSampleSum.sleepSum).toEqual(150);
    done();
  });
});
