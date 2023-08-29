import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";


/*
 link to HealthKit library https://github.com/agencyenterprise/react-native-health/blob/master/docs/permissions.md
*/

/**
 * Set up permissions for retrieving data from healthkit, and possibly gps in the future
 */
export const setupPermissions = () => {
  const readPermissions = ["StepCount", "DistanceWalkingRunning", "DistanceSwimming", "DistanceCycling",   // Activity Permissions
                        "FlightsClimbed", "ActiveEnergyBurned", "BasalEnergyBurned", "AppleStandTime",   // Activity Permissions
                        "HeartRate", "HeartRateVariability", "RestingHeartRate",                         // Heart Rate Related Permissions
                        "EnvironmentalAudioExposure", "HeadphoneAudioExposure", "MindfulSession", "SleepAnalysis",];      

  /* Permission options */
const permissions = {
  permissions: {
    write: [],
    read: readPermissions,
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log("[ERROR] Cannot grant permissions!");
  }
});
}


/**
 * Gets the Healthkit data for the particular method using the given options
 * @param method healthkit method to call
 * @param options Healthkit options including data and acending 
 * @returns 
 */
export async function retrieveHealthKitData(method: string, startDate: Date, endDate: Date): Promise<HealthValue[]> {
  const options = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    ascending: true,
  };
  return new Promise((resolve, reject) => {
    AppleHealthKit[method](
      options,
      (err: string, results: Array<HealthValue>) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      },
    );
  });
}




/**
 * Computes the difference in dates in milliseconds for duration fields
 * @param date1 
 * @param date2 
 * @returns 
 */
export function dateDifferenceInMilliSeconds(date1: Date, date2: Date): number {
  var date1Time: number = date1.getTime();
  var date2Time: number = date2.getTime();
  return Math.abs(date1Time - date2Time);


}

/**
 * Are these two dates the same?
 * @param date1
 * @param date2 
 * @returns boolean
 */
export function sameDate(date1: Date, date2: Date): boolean {
  return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
}






