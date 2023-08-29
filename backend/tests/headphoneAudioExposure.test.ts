import { IHeadphoneAudioExposure, IHeadphoneAudioExposureDTO } from '@/interfaces/IHeadphoneAudioExposure';
import HeadphoneAudioExposure from '@/services/headphoneAudioExposure';
import HeadphoneExposureSample from '@/models/headphoneAudioExposure';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
import * as console from "console";
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const HeadphoneAudioExposureServiceInstance = new HeadphoneAudioExposure(
  HeadphoneExposureSample,
  LoggerInstance,
  eventDispatcher,
);

describe('Add HeadphoneAudioExposure document to database', () => {
  it('Add document', async done => {
    const dateRightNow = new Date();
    const earlierDate = new Date(2020);
    const earliestDate = new Date(2020);
    const headphoneAudioExposureExample: IHeadphoneAudioExposureDTO[] = [
      {
        userID: '54321',
        startDate: dateRightNow,
        duration: 500,
        value: 250,
        hkID: '54321',
      },
      {
        userID: '54321',
        startDate: dateRightNow,
        duration: 1000,
        value: 500,
        hkID: '54321',
      },
    ];
    await HeadphoneAudioExposureServiceInstance.addManyHeadphoneAudioExposure(headphoneAudioExposureExample);

    const headphoneAudioExposureFromDB = await HeadphoneAudioExposureServiceInstance.getHeadphoneAudioExposureByDateRange('54321', earliestDate, dateRightNow);
    expect(headphoneAudioExposureFromDB[0].userID).toEqual('54321');
    expect(headphoneAudioExposureFromDB[0].startDate).toEqual(dateRightNow);
    expect(headphoneAudioExposureFromDB[0].duration).toEqual(500);
    expect(headphoneAudioExposureFromDB[0].value).toEqual(250);
    expect(headphoneAudioExposureFromDB[0].hkID).toEqual('54321');

    done();
  });
});
