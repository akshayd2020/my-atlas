import { IUserInputDTO } from '../src/interfaces/IUser';
import AuthService from '../src/services/auth';
import User from '../src/models/user';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
import UserService from '@/services/user';
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const userServiceInstance = new UserService(User, LoggerInstance, eventDispatcher);
const authServiceInstance = new AuthService(User, LoggerInstance, eventDispatcher);

describe('Add User document to database', () => {
  it('Add document', async done => {
    const userExample: IUserInputDTO = {
      name: 'test-user',
      email: 'testemail@test.com',
      password: 'test',
      phoneNumber: '8888888888',
      dob: '01/01/2001',
      age: 20,
    };

    const { user, token } = await authServiceInstance.SignUp(userExample);
    await userServiceInstance.updateUserDate(user._id);
    const userFromDB = await User.findById(user._id);

    expect(userFromDB.name).toEqual('test-user');
    expect(userFromDB.email).toEqual('testemail@test.com');
    done();
  });
});
