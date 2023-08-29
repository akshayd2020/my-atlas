import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import gps from './routes/gps';
import agendash from './routes/agendash';
import onboarding from './routes/onboarding';
import activity from './routes/activity';
import heartRateSample from './routes/heartRateSample';
import heartRateVariability from './routes/heartRateVariability';
import restingHeartRate from './routes/restingHeartRate';
import sleepSample from './routes/sleepSample';
import environmentalAudioExposure from './routes/environmentalAudioExposure';
import headphoneAudioExposure from './routes/headphoneAudioExposure';
import mindfulSession from './routes/mindfulSession';
// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);
  onboarding(app);
  activity(app);
  gps(app);
  heartRateSample(app);
  heartRateVariability(app);
  restingHeartRate(app);
  sleepSample(app);
  environmentalAudioExposure(app);
  headphoneAudioExposure(app);
  mindfulSession(app);

  return app;
};



