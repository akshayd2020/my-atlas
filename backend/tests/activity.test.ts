import Activity from '../src/models/activity';
import { IActivityDTO } from '../src/interfaces/IActivity';
import ActivityService from '../src/services/activity';
import AuthService from '../src/services/auth';
import User from "../src/models/user";
import LoggerInstance from "../src/loaders/logger";
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll (async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const activityServiceInstance = new ActivityService(Activity, LoggerInstance, eventDispatcher);

describe("Add Activity document to database", () => {
  it('Add document', async done => {
    const activityExample: IActivityDTO = {
      date: new Date(1478708162000),
      userID: "hiello",
      dailyStepCountSamples: 123123,
      dailyDistanceWalkingRunningSamples: 1298,
      dailyDistanceSwimmingSamples: 193,
      dailyDistanceCyclingSamples: 1234,
      dailyFlightsClimbedSamples: 238,
      activeEnergyBurned: 123,
      basalEnergyBurned: 23,
      appleStandTime: 3812
    }
    const activity = await activityServiceInstance.addActivity(activityExample);
    const activityFromDB = await Activity.findById(activity._id);
    expect(activityFromDB.userID).toEqual("hiello");
    expect(activityFromDB.dailyStepCountSamples).toEqual(123123);

    const activity2 = await activityServiceInstance.getActivityInfoByIDAndDate("hiello", new Date(1478708162000));
    expect(activity2.userID).toEqual("hiello");
    expect(activity2.dailyStepCountSamples).toEqual(123123);
    done();
  })
})