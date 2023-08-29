import { IGPS, IGPSInputDTO } from '../src/interfaces/IGPS';
import GPSService from '../src/services/gps';
import { IDeleteMany } from '@/interfaces/IDeleteMany';
import Gps from '../src/models/gps';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const gpsServiceInstance = new GPSService(Gps, LoggerInstance, eventDispatcher);

describe('Add gps document to database', () => {
  it('Add document', async done => {
    const gpsExample: IGPSInputDTO = {
      userID: 'userID',
      latitude: 20,
      longitude: 30,
      altitude: 10,
      accuracy: 50,
      timestamp: new Date(1478708162000),
    };
    const gpsExample2: IGPSInputDTO[] = [
      {
        userID: 'userID',
        latitude: 202,
        longitude: 302,
        altitude: 102,
        accuracy: 502,
        timestamp: new Date(1478708162000),
      },
      {
        userID: 'userID',
        latitude: 203,
        longitude: 303,
        altitude: 103,
        accuracy: 503,
        timestamp: new Date(1478708162000),
      },
    ];
    await gpsServiceInstance.addGPS(gpsExample);
    const gpsDB: { gps: IGPS } = await gpsServiceInstance.getGPS('userID');
    expect(gpsDB.gps.longitude).toEqual(30);
    expect(gpsDB.gps.latitude).toEqual(20);
    expect(gpsDB.gps.accuracy).toEqual(50);
    expect(gpsDB.gps.timestamp).toEqual(new Date(1478708162000));
    await gpsServiceInstance.addManyGPS(gpsExample2);
    const deleteReturn: IDeleteMany = await gpsServiceInstance.deleteGPSByUserID(gpsExample.userID);
    expect(deleteReturn.acknowledged).toEqual(true);
    expect(deleteReturn.deletedCount).toEqual(3);
    expect(await Gps.findOne({ userID: gpsExample.userID })).toEqual(null);

    done();
  });
});
