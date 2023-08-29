import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { dateDifferenceInMilliSeconds, retrieveHealthKitData } from './healthKitService';
import { ISleepSample, ISleepSampleDTO, ISleepSampleLocal } from '../../interfaces/ISleepSample';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { err } from 'react-native-svg/lib/typescript/xml';


export const addSleepSampleLocal = async (userId: string) => {
  try{
    const today: Date = new Date();
    today.setHours(0,0,0,0)
    const sleepSamples : Array<HealthValue> = await retrieveHealthKitData("getSleepSamples", today, new Date());
    const sleepSampleDTOS : Array<ISleepSampleDTO>= convertSleepSamples(userId, sleepSamples);
    console.log(sleepSampleDTOS)
    if (sleepSampleDTOS.length > 0){
     
      let inBedSleepSampleDTO: ISleepSampleLocal = {
        userID: userId,
        startDate: new Date(),
        duration: 0,
        sleepState: "INBED"
      }
      let asleepSleepSampleDTO: ISleepSampleLocal = {
        userID: userId,
        startDate: new Date(),
        duration: 0,
        sleepState: "ASLEEP"
      }
      let deepSleepSampleDTO: ISleepSampleLocal = {
        userID: userId,
        startDate: new Date(),
        duration: 0,
        sleepState: "DEEP"
      }
      let coreSleepSampleDTO: ISleepSampleLocal = {
        userID: userId,
        startDate: new Date(),
        duration: 0,
        sleepState: "CORE"
      }
      let remSleepSampleDTO: ISleepSampleLocal = {
        userID: userId,
        startDate: new Date(),
        duration: 0,
        sleepState: "REM"
      }
      for (let i = 0; i < sleepSampleDTOS.length; i++) {
        switch(sleepSampleDTOS[i].sleepState) {
          case "INBED":
            inBedSleepSampleDTO.duration += sleepSampleDTOS[i].duration;
            break;
          case 'ASLEEP':
            asleepSleepSampleDTO.duration += sleepSampleDTOS[i].duration;
            break;
          case 'DEEP':
            deepSleepSampleDTO.duration += sleepSampleDTOS[i].duration;
            break;
          case 'CORE':
            coreSleepSampleDTO.duration += sleepSampleDTOS[i].duration;
              break;
          case 'REM':
            remSleepSampleDTO.duration += sleepSampleDTOS[i].duration;
                break;
          default:
            console.log('Unknown Sleep State.');
            break;
        }
      }
      setItemAsync("InBedSleepSamples", JSON.stringify(inBedSleepSampleDTO));
      setItemAsync("AsleepSleepSamples", JSON.stringify(asleepSleepSampleDTO));
      setItemAsync("DeepSleepSamples", JSON.stringify(deepSleepSampleDTO));
      setItemAsync("CoreSleepSamples", JSON.stringify(coreSleepSampleDTO));
      setItemAsync("RemSleepSamples", JSON.stringify(remSleepSampleDTO));
  
    }
  }
  catch (error){
    console.log(error)
  }
}
/**
 * 
 * @returns 
 */
export const addManySleepSample = async (userId : string, authToken: string,  startDate: Date, endDate: Date) => {
  try{
      const headers = {
    'Authorization': 'Bearer ' + authToken,
  };
  const sleepSamples : Array<HealthValue> = await retrieveHealthKitData("getSleepSamples", startDate, endDate);
  const sleepSampleDTOS : Array<ISleepSampleDTO>= convertSleepSamples(userId, sleepSamples);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/sleepSample/addManySleepSample', 
            sleepSampleDTOS, 
            {headers})
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
    } catch(error){
      console.log(error);
    }
};


/**
 * Converts array of HealthValues to array of ISleepSampleDTO.
 * @param sleepSamples 
 * @returns 
 */
function convertSleepSamples(userId: string, sleepSamples: Array<HealthValue>): Array<ISleepSampleDTO> {
  var sleepSampleDTOS: Array<ISleepSampleDTO> = [];
  sleepSamples.forEach(sample => {
    let startDate = new Date(sample.startDate);
    let duration = dateDifferenceInMilliSeconds(startDate, new Date(sample.endDate));
    const sleepSampleDTO: ISleepSampleDTO = {
      userID: userId,
      startDate: startDate,
      duration: duration,
      sleepState: sample.value.toString()
    }
    // Add each sample
    sleepSampleDTOS.push(sleepSampleDTO)
  });
  return sleepSampleDTOS;
}