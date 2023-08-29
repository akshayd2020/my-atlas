import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';


export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  };
  const onboardingModel = {
    name: 'onboardingModel',
    model: require('../models/onboarding').default,
  }

  const activityModel = {
    name: 'activityModel',
    model: require('../models/activity').default,
  };

  const environmentalAudioExposureModel = {
    name: 'environmentalAudioExposureModel',
    // Notice the require syntax and the '.default'
    model: require('../models/environmentalAudioExposure').default,
  };
  const mindfulSessionModel = {
    name: 'mindfulSessionModel',
    model: require('../models/mindfulSession').default,
  };

  const headphoneAudioExposureModel = {
    name: 'headphoneAudioExposureModel',
    model: require('../models/headphoneAudioExposure').default,
  };

  const sleepSampleModel = {
    name: 'sleepSampleModel',
    model: require('../models/sleepSample').default,
  };

  const gpsModel = {
    name: 'gpsModel',
    model: require('../models/gps').default,
  };

  const heartRateSampleModel = {
    name: 'heartRateSampleModel',
    model: require('../models/heartRateSample').default,
  };

  const heartRateVariabilityModel = {
    name: 'heartRateVariabilityModel',
    model: require('../models/heartRateVariability').default,
  };

  const restingHeartRateModel = {
    name: 'restingHeartRateModel',
    model: require('../models/restingHeartRate').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      onboardingModel,
      gpsModel,
      activityModel,
      environmentalAudioExposureModel,
      mindfulSessionModel,
      headphoneAudioExposureModel,
      sleepSampleModel,
      heartRateSampleModel,
      heartRateVariabilityModel,
      restingHeartRateModel
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await jobsLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
