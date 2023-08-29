import { IEnvironmentalAudioExposure, IEnvironmentalAudioExposureDTO } from '@/interfaces/IEnvironmentalAudioExposure';
import EnvironmentalAudioExposureService from '@/services/environmentalAudioExposure';
import EnvironmentalAudioExposure from '@/models/environmentalAudioExposure';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const EnvironmentalAudioExposureServiceInstance = new EnvironmentalAudioExposureService(
  EnvironmentalAudioExposure,
  LoggerInstance,
  eventDispatcher,
);

describe('Add EnvironmentalAudioExposure document to database', () => {
  it('Add document', async done => {
    const dateRightNow = new Date(2020, 3, 14, 0, 0);
    const dateSecond = new Date(2020, 4, 15, 20, 0);
    const environmentalAudioExposureExample: IEnvironmentalAudioExposureDTO = {
      userID: '12345',
      startDate: dateRightNow,
      duration: 1000,
      value: 500,
      hkID: '12345',
    };
    const environmentalAudioExposureExample2: IEnvironmentalAudioExposureDTO = {
      userID: '12345',
      startDate: dateSecond,
      duration: 1000,
      value: 500,
      hkID: '12345',
    };
    const {
      environmentalAudioExposure,
    } = await EnvironmentalAudioExposureServiceInstance.addEnvironmentalAudioExposure(
      environmentalAudioExposureExample,
    );
    await EnvironmentalAudioExposureServiceInstance.addEnvironmentalAudioExposure(environmentalAudioExposureExample2);
    const environmentalAudioExposureFromDB = await EnvironmentalAudioExposureServiceInstance.getEnvironmentalAudioExposureByDateRange(
      '12345',
      dateRightNow,
      dateSecond,
    );

    expect(environmentalAudioExposureFromDB.length).toEqual(2);
    expect(environmentalAudioExposureFromDB[0].userID).toEqual("12345");
    expect(environmentalAudioExposureFromDB[0].startDate).toEqual(dateRightNow);
    expect(environmentalAudioExposureFromDB[0].duration).toEqual(1000);
    expect(environmentalAudioExposureFromDB[0].value).toEqual(500);
    expect(environmentalAudioExposureFromDB[0].hkID).toEqual('12345');
    done();
  });
});
