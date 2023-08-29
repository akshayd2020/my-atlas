import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { dateDifferenceInMilliSeconds, retrieveHealthKitData } from './healthKitService';
import { IEnvironmentalAudioExposureSample, IEnvironmentalAudioExposureSampleDTO, IEnvironmentalAudioExposureLocal } from '../../interfaces/IEnvironmentalAudioExposureSample';

import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

export const addEnvironmentAudioExposureLocal = async (userId: string) => {
  try{
    const today: Date = new Date();
    today.setHours(0,0,0,0)
    const environmentAudios : Array<HealthValue> = await retrieveHealthKitData("getEnvironmentalAudioExposure", today, new Date());
    const environmentAudioDTOS : Array<IEnvironmentalAudioExposureSampleDTO>= convertEnvironmentAudioSamples(userId, environmentAudios);

    if (environmentAudioDTOS.length > 0){
      let value = 0;
      let duration = 0;
     
      for (let i = 0; i < environmentAudioDTOS.length; i++){
        value += environmentAudioDTOS[i].value * environmentAudioDTOS[i].duration;
        duration += environmentAudioDTOS[i].duration;

      }
      const environmentalAudioExposureLocal: IEnvironmentalAudioExposureLocal = {
        userID: userId,
        startDate: new Date(),
        value: value / duration
      }
      setItemAsync("EnvironmentAudio", JSON.stringify(environmentalAudioExposureLocal));
    
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
export const addManyEnvironmentalAudioExposure = async (userId : string, authToken:string, startDate: Date, endDate: Date) : Promise<IEnvironmentalAudioExposureSample[]> => {
    try{
      const headers = {
        'Authorization': 'Bearer ' + authToken,
      };
  const environmentAudios : Array<HealthValue> = await retrieveHealthKitData("getEnvironmentalAudioExposure", startDate, endDate);
  const environmentAudioDTOS : Array<IEnvironmentalAudioExposureSampleDTO>= convertEnvironmentAudioSamples(userId, environmentAudios);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/environmentalAudioExposure/addManyEnvironmentalAudioExposure', 
            environmentAudioDTOS,
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
    }
    catch(error){
      console.log(error);
    }
};


/**
 * 
 * @param userId 
 * @param mindfulSessions 
 * @returns 
 */
function convertEnvironmentAudioSamples(userId: string, environmentAudios: Array<HealthValue>): Array<IEnvironmentalAudioExposureSampleDTO> {
  var environmentAudioDTOS: Array<IEnvironmentalAudioExposureSampleDTO> = [];
  environmentAudios.forEach(sample => {
    let startDate = new Date(sample.startDate);
    let duration = dateDifferenceInMilliSeconds(startDate, new Date(sample.endDate));
    const environmentalAudioExposureSampleDTO: IEnvironmentalAudioExposureSampleDTO = {
      userID: userId,
      startDate: startDate,
      duration: duration,
      value: sample.value,
      hkID: sample.id
    }
    // Add each sample
    environmentAudioDTOS.push(environmentalAudioExposureSampleDTO)
  });
  return environmentAudioDTOS;
}
