import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { retrieveHealthKitData, sameDate } from './healthKitService';
import { IActivityDTO } from '../../interfaces/IActivity';

import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

export const addActivityLocal = async (userId: string) => {
  try {
    const startDate: Date = new Date();
    startDate.setHours(0, 0, 0, 0);
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 1);
    const steps: HealthValue[] = await retrieveHealthKitData(
      'getDailyStepCountSamples',
      startDate,
      endDate,
    );
    console.log(steps);
    const walkingRunning: HealthValue[] = await retrieveHealthKitData(
      'getDailyDistanceWalkingRunningSamples',
      startDate,
      endDate,
    );
    const swimming: HealthValue[] = await retrieveHealthKitData(
      'getDailyDistanceSwimmingSamples',
      startDate,
      endDate,
    );
    const cycling: HealthValue[] = await retrieveHealthKitData(
      'getDailyDistanceCyclingSamples',
      startDate,
      endDate,
    );
    const flights: HealthValue[] = await retrieveHealthKitData(
      'getDailyFlightsClimbedSamples',
      startDate,
      endDate,
    );
    const activeEnergy: HealthValue[] = await retrieveHealthKitData(
      'getActiveEnergyBurned',
      startDate,
      endDate,
    );
    const basalEnergy: HealthValue[] = await retrieveHealthKitData(
      'getBasalEnergyBurned',
      startDate,
      endDate,
    );
    const standTime: HealthValue[] = await retrieveHealthKitData(
      'getAppleStandTime',
      startDate,
      endDate,
    );

    const activitySamples: ActivityHealthValues = {
      steps,
      walkingRunning,
      swimming,
      cycling,
      flights,
      activeEnergy,
      basalEnergy,
      standTime,
    };
    // Convert the Activities to IActivityDTO[]
    const activityDTOS: IActivityDTO[] = convertActivity(
      userId,
      startDate,
      endDate,
      activitySamples,
    );
    if (activityDTOS.length > 0) {
      const activity = activityDTOS[0];
      console.log(activity);
      setItemAsync('Activity', JSON.stringify(activity));
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Can get the activities, but needs to be wrapped in a promise. I would use this to send healthvalues
 * @param startDate
 */
export async function addManyActivities(
  userId: string,
  authToken: string,
  startDate: Date,
  endDate: Date,
) {
  try {
    const steps: HealthValue[] = await retrieveHealthKitData(
      'getDailyStepCountSamples',
      startDate,
      endDate,
    );
    const walkingRunning: HealthValue[] = await retrieveHealthKitData(
      'getDailyDistanceWalkingRunningSamples',
      startDate,
      endDate,
    );
    const swimming: HealthValue[] = await retrieveHealthKitData(
      'getDailyDistanceSwimmingSamples',
      startDate,
      endDate,
    );
    const cycling: HealthValue[] = await retrieveHealthKitData(
      'getDailyDistanceCyclingSamples',
      startDate,
      endDate,
    );
    const flights: HealthValue[] = await retrieveHealthKitData(
      'getDailyFlightsClimbedSamples',
      startDate,
      endDate,
    );
    const activeEnergy: HealthValue[] = await retrieveHealthKitData(
      'getActiveEnergyBurned',
      startDate,
      endDate,
    );
    const basalEnergy: HealthValue[] = await retrieveHealthKitData(
      'getBasalEnergyBurned',
      startDate,
      endDate,
    );
    const standTime: HealthValue[] = await retrieveHealthKitData(
      'getAppleStandTime',
      startDate,
      endDate,
    );

    const activitySamples: ActivityHealthValues = {
      steps,
      walkingRunning,
      swimming,
      cycling,
      flights,
      activeEnergy,
      basalEnergy,
      standTime,
    };
    // Convert the Activities to IActivityDTO[]
    const activityDTOS: IActivityDTO[] = convertActivity(
      userId,
      startDate,
      endDate,
      activitySamples,
    );

    const headers = {
      Authorization: 'Bearer ' + authToken,
    };
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .post('http://localhost:3000/api/activity/addManyActivity', activityDTOS, { headers })
          .then(
            response => {
              console.log(response.data);
              resolve(response.data);
            },
            error => {
              console.log(error.response.data.errors.message);
              reject(error.response.data.errors.message);
            },
          );
      });
    });
  } catch (err) {
    console.log(err);
  }
}
interface ActivityHealthValues {
  steps: Array<HealthValue>;
  walkingRunning: Array<HealthValue>;
  swimming: Array<HealthValue>;
  cycling: Array<HealthValue>;
  flights: Array<HealthValue>;
  activeEnergy: Array<HealthValue>;
  basalEnergy: Array<HealthValue>;
  standTime: Array<HealthValue>;
}

/**
 * Convert the Activity to a list of a IActivtyDTO using a start date. This start date will typically be the last retrieval date
 * or something along those lines
 * @param startDate
 * @param activityHealthValues
 * @returns IActivityDTO[]
 */
function convertActivity(
  userId: string,
  startDate: Date,
  endDate: Date,
  activityHealthValues: ActivityHealthValues,
): IActivityDTO[] {
  var activityDTOs: IActivityDTO[] = [];
  for (var d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
    let activityDTO: IActivityDTO = {
      userID: userId,
      date: new Date(d),
    };
    updateActivityDTO(activityHealthValues, activityDTO, d, 'steps', 'dailyStepCountSamples');
    updateActivityDTO(
      activityHealthValues,
      activityDTO,
      d,
      'walkingRunning',
      'dailyDistanceWalkingRunningSamples',
    );
    updateActivityDTO(
      activityHealthValues,
      activityDTO,
      d,
      'swimming',
      'dailyDistanceSwimmingSamples',
    );
    updateActivityDTO(
      activityHealthValues,
      activityDTO,
      d,
      'cycling',
      'dailyDistanceCyclingSamples',
    );
    updateActivityDTO(
      activityHealthValues,
      activityDTO,
      d,
      'flights',
      'dailyFlightsClimbedSamples',
    );
    updateActivityDTO(activityHealthValues, activityDTO, d, 'activeEnergy', 'activeEnergyBurned');
    updateActivityDTO(activityHealthValues, activityDTO, d, 'basalEnergy', 'basalEnergyBurned');
    updateActivityDTO(activityHealthValues, activityDTO, d, 'standTime', 'appleStandTime');
    // If only user and date no need to push
    if (Object.keys(activityDTO).length > 2) {
      activityDTOs.push(activityDTO);
    }
  }
  return activityDTOs;
}

/**
 * activityDTO  object based on if the first date in activityHealthValues for the healthValueFieldName is equal to the given date
 * For example: activityHealthValues contains "steps". "steps" would be the healthValueFieldName. If the first HealthValue in "steps"
 * has a date matching the given date update the dtoFieldName in activityDTO
 * @param activityHealthValues
 * @param activityDTO
 * @param date
 * @param healthValueFieldName
 * @param dtoFieldName
 */
function updateActivityDTO(
  activityHealthValues: ActivityHealthValues,
  activityDTO: IActivityDTO,
  date: Date,
  healthValueFieldName: string,
  dtoFieldName: string,
) {
  let sum = 0;
  while (
    activityHealthValues[healthValueFieldName].length > 0 &&
    sameDate(new Date(activityHealthValues[healthValueFieldName][0].startDate), date)
  ) {
    sum += activityHealthValues[healthValueFieldName].shift().value;
    activityDTO[dtoFieldName] = sum;
  }
}
