import { addManySleepSample, addSleepSampleLocal } from './sleepSampleService';
import {
  addManyEnvironmentalAudioExposure,
  addEnvironmentAudioExposureLocal,
} from './environmentalAudioExposureService';
import {
  addManyHeadphoneAudioExposure,
  addHeadphoneAudioExposureLocal,
} from './headphoneAudioExposureService';
import { addManyHeartRateSample, addHeartRateSampleLocal } from './heartRateSampleService';
import {
  addManyHeartRateVariabilities,
  addHeartRateVariabilityLocal,
} from './heartRateVariabilityService';
import { addManyRestingHeartRate, addRestingHeartRateLocal } from './restingHeartRateService';
import { addManyMindfulSession, addMindfulSessionLocal } from './mindfulSessionService';

import { addManyActivities, addActivityLocal } from './activityService';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { getUser, updateUserDataDate } from '../userService';
import { sameDate } from './healthKitService';
export async function addMany(userId: string, token: string) {
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);
  console.log('****************************************************');
  try {
    const user = await getUser(token);
    const oneMonthAgo = new Date(); // Create a new Date object
    // Set the month of the new Date object to one month ago
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const lastRetrievalDate =
      user.lastDateDataRetrieved == null ? oneMonthAgo : new Date(user.lastDateDataRetrieved);
    console.log(lastRetrievalDate);
    if (lastRetrievalDate.getTime() < today.getTime()) {
      // Only try to add if the last retrieval date is before today

      console.log('Adding many');
      await addManyEnvironmentalAudioExposure(userId, token, lastRetrievalDate, today);
      await addManyHeadphoneAudioExposure(userId, token, lastRetrievalDate, today);
      await addManySleepSample(userId, token, lastRetrievalDate, today);
      await addManyHeartRateSample(userId, token, lastRetrievalDate, today);
      await addManyHeartRateVariabilities(userId, token, lastRetrievalDate, today);
      await addManyRestingHeartRate(userId, token, lastRetrievalDate, today);
      await addManyMindfulSession(userId, token, lastRetrievalDate, today);
      await addManyActivities(userId, token, lastRetrievalDate, today);
      const newUser = await updateUserDataDate(userId, today, token); // update the last retrieval date
    }
  } catch (error) {
    console.log("Couldn't find stuff");
  }
}

export async function addHealthLocally(userId: string) {
  try {
    const lastRetrievalDate = new Date(await getItemAsync('LastRetrievalDate'));
    if (lastRetrievalDate.getTime() + 60000 < new Date().getTime()) {
      console.log('****************************************************');
      await addEnvironmentAudioExposureLocal(userId);
      await addHeadphoneAudioExposureLocal(userId);
      await addSleepSampleLocal(userId);
      await addHeartRateSampleLocal(userId);
      await addHeartRateVariabilityLocal(userId);
      await addRestingHeartRateLocal(userId);

      await addMindfulSessionLocal(userId);
      await addActivityLocal(userId);
      setItemAsync('LastRetrievalDate', new Date().toISOString());
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getLocalData() {
  try {
    setItemAsync('LastRetrievalDate', new Date().toISOString());
    console.log('****************************************************');
    console.log(await getItemAsync('SleepSamples'));
    console.log(await getItemAsync('EnvironmentAudio'));
    console.log(await getItemAsync('HeadphoneSample'));
    console.log(await getItemAsync('HeartRateSample'));
    console.log(await getItemAsync('HeartRateVariability'));
    console.log(await getItemAsync('MindfulSession'));
    console.log(await getItemAsync('Activity'));
    console.log(await getItemAsync('RestingHeartRate'));
    console.log(await getItemAsync('InBedSleepSamples'));
    console.log(await getItemAsync('AsleepSleepSamples'));
    console.log(await getItemAsync('DeepSleepSamples'));
    console.log(await getItemAsync('CoreSleepSamples'));
    console.log(await getItemAsync('RemSleepSamples'));
  } catch (error) {
    console.log(error);
  }
}
