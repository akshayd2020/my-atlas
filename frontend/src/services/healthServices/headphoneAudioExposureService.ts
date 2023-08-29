import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { dateDifferenceInMilliSeconds, retrieveHealthKitData } from './healthKitService';
import { IActivityDTO } from '../../interfaces/IActivity';
import { IHeadphoneAudioExposureDTO, IHeadphoneAudioExposure, IHeadphoneAudioExposureLocal } from '../../interfaces/IHeadphoneAudioExposure';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

export const addHeadphoneAudioExposureLocal = async (userId: string) => {
  try{
    const today: Date = new Date();
    today.setHours(0,0,0,0)
    const headphoneExposureSamples : Array<HealthValue> = await retrieveHealthKitData("getHeadphoneAudioExposure", today, new Date());
    const headphoneExposureSampleDTOs : Array<IHeadphoneAudioExposureDTO>= convertHeadphoneExposureSamples(userId, headphoneExposureSamples);

    if (headphoneExposureSampleDTOs.length > 0){
      let value = 0;
      let duration = 0;
     
      for (let i = 0; i < headphoneExposureSampleDTOs.length; i++){
        value += headphoneExposureSampleDTOs[i].value * headphoneExposureSampleDTOs[i].duration;
        duration += headphoneExposureSampleDTOs[i].duration;

      }
      const headphoneAudioExposure: IHeadphoneAudioExposureLocal = {
        userID: userId,
        startDate: new Date(),
        value: value / duration
      }
      setItemAsync("HeadphoneSample", JSON.stringify(headphoneAudioExposure));
    
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
export const addManyHeadphoneAudioExposure = async (userId:string, authToken:string, startDate:Date, endDate:Date) : Promise<IHeadphoneAudioExposure[]> => {
  try{
  const headers = {
    'Authorization': 'Bearer ' + authToken,
  };
  const headphoneExposureSamples : Array<HealthValue> = await retrieveHealthKitData("getHeadphoneAudioExposure", startDate, endDate);
    const headphoneExposureSampleDTOs : Array<IHeadphoneAudioExposureDTO>= convertHeadphoneExposureSamples(userId, headphoneExposureSamples);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/headphoneAudioExposure/addManyHeadphoneAudioExposure', 
            headphoneExposureSampleDTOs,
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
 * Converts array of HealthValues to array of IHeadphoneExposureSampleDTO.
 * @param headphoneExposureSamples 
 * @returns Array<IHeadphoneExposureSampleDTO>
 */
function convertHeadphoneExposureSamples(userId: string, headphoneExposureSamples: Array<HealthValue>): Array<IHeadphoneAudioExposureDTO> {
    var headphoneExposureSampleDTOs: Array<IHeadphoneAudioExposureDTO> = [];
    headphoneExposureSamples.forEach(sample => {
      let startDate = new Date(sample.startDate);
      let duration = dateDifferenceInMilliSeconds(startDate, new Date(sample.endDate));
      const headphoneExposureSampleDTO: IHeadphoneAudioExposureDTO = {
        userID: userId,
        startDate: startDate,
        duration: duration,
        value: sample.value,
        hkID: sample.id,
        //hkWasUserEntered: Boolean(sample.metadata.HKWasUserEntered)
      }
      // Add each sample
      headphoneExposureSampleDTOs.push(headphoneExposureSampleDTO)
    });
    return headphoneExposureSampleDTOs;
  }
  