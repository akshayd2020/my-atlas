import { Document, Model } from 'mongoose';
import { IUser } from '@/interfaces/IUser';
import {IOnboarding} from "@/interfaces/IOnboarding";
import { IActivity} from '../../interfaces/IActivity';
import { IGPS } from '../../interfaces/IGPS';
import { IHeartRateSample } from '@/interfaces/IHeartRateSample';
import { IHeartRateVariability } from '@/interfaces/IHeartRateVariability';
import { IRestingHeartRate } from '@/interfaces/IRestingHeartRate';
import { type } from 'os';
import { IMindfulSession } from '@/interfaces/IMindfulSession';
import { IEnvironmentalAudioExposure } from '@/interfaces/IEnvironmentalAudioExposure';
import { IHeadphoneAudioExposure } from '@/interfaces/IHeadphoneAudioExposure';
import { ISleepSample } from '@/interfaces/ISleepSample';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type OnboardingModel = Model<IOnboarding & Document>;
    export type ActivityModel = Model<IActivity & Document>;
    export type GPSModel = Model<IGPS & Document>;
    export type HeartRateSampleModel = Model<IHeartRateSampleModel & Document>;
    export type HeartRateVariabilityModel = Model<IHeartRateVariabilityModel & Document>;
    export type RestingHeartRateModel = Model<IRestingHeartRateModel & Document>;   
    export type MindfulSessionModel = Model<IMindfulSession & Document>
    export type EnvironmentalAudioExposureModel = Model<IEnvironmentalAudioExposure & Document>
    export type HeadphoneAudioExposureModel = Model<IHeadphoneAudioExposure & Document>
    export type SleepSampleModel = Model<ISleepSample & Document>
  }
}
