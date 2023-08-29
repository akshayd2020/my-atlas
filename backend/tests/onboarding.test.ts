import { IOnboardingInputDTO } from '../src/interfaces/IOnboarding';
import OnboardingService from '../src/services/onboarding';
import Onboarding from '../src/models/onboarding';
import LoggerInstance from '../src/loaders/logger';
import { EventDispatcher as EventDispatcherClass } from 'event-dispatch';
import Gps from "@/models/gps";
import {Error} from "mongoose";
import ValidationError from "mongoose";
// Next 4 lines required in every test file
const db = require('./db');

beforeAll(async () => await db.connect(), 18000);
let mongoServer: any;

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

const eventDispatcher = new EventDispatcherClass();
const onboardingServiceInstance = new OnboardingService(Onboarding, LoggerInstance, eventDispatcher);

describe('Add onboarding document to database', () => {
  it('Add document', async done => {
    const onboardingExample: IOnboardingInputDTO = {
      userID: 'userTest',
      city: 'Boston',

    };
    await onboardingServiceInstance.addOnboarding(onboardingExample);
    const personality = await onboardingServiceInstance.getPersonalityTestCompleted('userTest');
    expect(personality.personalityTestCompleted).toEqual(false);
    const onboardingDB = await onboardingServiceInstance.getOnboarding(onboardingExample.userID);
    const onboardingUpdate: IOnboardingInputDTO = {
      userID: 'userTest',

      zipcode: 5,
      religion: 'None',
      religionOther: 'Lol Jk RELIGION',
      ethnicity: 'Ethnic',
      identifyYourself: 'sure',
      gender: 'Male',
      genderOther: 'OtherTest',
      pronouns: 'He/Him',
      pronounsOther: 'Nah',
      concerns: ['concern1', 'concern2'],
      goals: ['goal1', 'goal2'],
    };
    const onboardingDB2 = await onboardingServiceInstance.updateOnboardingByUserID(onboardingUpdate);
    expect(onboardingDB2.onboarding.zipcode).toEqual(5);
    expect(onboardingDB2.onboarding.city).toEqual('Boston');
    expect(onboardingDB2.onboarding.religion).toEqual('None');
    expect(onboardingDB2.onboarding.religionOther).toEqual('Lol Jk RELIGION');
    expect(onboardingDB2.onboarding.ethnicity).toEqual('Ethnic');
    expect(onboardingDB2.onboarding.identifyYourself).toEqual('sure');
    expect(onboardingDB2.onboarding.gender).toEqual('Male');
    expect(onboardingDB2.onboarding.genderOther).toEqual('OtherTest');
    expect(onboardingDB2.onboarding.pronouns).toEqual('He/Him');
    expect(onboardingDB2.onboarding.pronounsOther).toEqual('Nah');
    expect(onboardingDB2.onboarding.concerns).toEqual(['concern1', 'concern2']);
    expect(onboardingDB2.onboarding.goals).toEqual(['goal1', 'goal2']);
    const onboardingUpdateRF: IOnboardingInputDTO = {
      userID: 'userTest',
      religion: 'All',
    };
    /*
    let error = null;
    try {
      await onboardingServiceInstance.updateOnboardingByUserID(onboardingUpdateRF);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    error = null;
    const onboardingUpdateRG: IOnboardingInputDTO = {
      userID: 'userTest',
      gender: 'All',
    };
    try {
      await onboardingServiceInstance.updateOnboardingByUserID(onboardingUpdateRG);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    error = null;
    const onboardingUpdateRP: IOnboardingInputDTO = {
      userID: 'userTest',
      pronouns: 'All',
    };
    try {
      await onboardingServiceInstance.updateOnboardingByUserID(onboardingUpdateRP);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    error = null;
    const onboardingUpdateRPT: IOnboardingInputDTO = {
      userID: 'userTest',
    };
    try {
      await onboardingServiceInstance.updateOnboardingByUserID(onboardingUpdateRPT);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    error = null;
    const onboardingDB3 = await onboardingServiceInstance.deleteOnboardingByUserID(onboardingExample.userID);
    expect(onboardingDB2).toEqual(onboardingDB3);
    expect(await Onboarding.findOne({ userID: onboardingExample.userID })).toEqual(null);

     */
    done();
  });
});
