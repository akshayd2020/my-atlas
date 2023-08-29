import { IMindfulSessionDTO } from '@/interfaces/IMindfulSession';
import MindfulSessionService from '@/services/mindfulSession';
import MindfulSession from '@/models/mindfulSession'
import LoggerInstance from "../src/loaders/logger";
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll (async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const mindfulSessionServiceInstance = new MindfulSessionService(MindfulSession, LoggerInstance, eventDispatcher);

describe("Add MindfulSession document to database", () => {
    it('Add document', async done => {
        const dateRightNow = new Date()
        const mindfulSessionExample: IMindfulSessionDTO = {
            userID: '12345',
            startDate: dateRightNow,
            duration: 1000
        }
        const { mindfulSession } = await mindfulSessionServiceInstance.addMindfulSession(mindfulSessionExample);
        const mindfulSessionFromDB = await MindfulSession.findById(mindfulSession._id);
        expect(mindfulSessionFromDB.userID).toEqual("12345");
        expect(mindfulSessionFromDB.startDate).toEqual(dateRightNow);
        expect(mindfulSessionFromDB.duration).toEqual(1000);
        done();
    })
})