import axios from 'axios';
import { HealthValue } from 'react-native-health';
import { dateDifferenceInMilliSeconds, retrieveHealthKitData } from './healthKitService';
import { IActivityDTO } from '../../interfaces/IActivity';
import { IHeartRateVariability, IHeartRateVariabilityDTO, IHeartRateVariabilityLocal } from '../../interfaces/IHeartRateVariability';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

export const addHeartRateVariabilityLocal = async (userId: string) => {
  try{
    const today: Date = new Date();
    today.setHours(0,0,0,0)
    const heartRateVariabilities : Array<HealthValue> = await retrieveHealthKitData("getHeartRateVariabilitySamples", today, new Date());
    const heartRateVariabilitiesDTOs : Array<IHeartRateVariabilityDTO>= convertHeartRateVariabilities(userId,heartRateVariabilities);
    if (heartRateVariabilitiesDTOs.length > 0){
      let sum = 0;
      const count = heartRateVariabilitiesDTOs.length;
     
      for (let i = 0; i < heartRateVariabilitiesDTOs.length; i++){
        sum += heartRateVariabilitiesDTOs[i].variability;
      }
      const heartRateVariabilityLocal: IHeartRateVariabilityLocal = {
        userID: userId,
        startDate: new Date(),
        variability: sum / count
      }
      setItemAsync("HeartRateVariability", JSON.stringify(heartRateVariabilityLocal));
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
export const addManyHeartRateVariabilities = async (userId : string , authToken:string ,startDate: Date, endDate: Date) : Promise<IHeartRateVariability[]> => {
  try{
  const headers = {
    'Authorization': 'Bearer ' + authToken,
  };
  const heartRateVariabilities : Array<HealthValue> = await retrieveHealthKitData("getHeartRateVariabilitySamples", startDate, endDate);
    const heartRateVariabilitiesDTOs : Array<IHeartRateVariabilityDTO>= convertHeartRateVariabilities(userId,heartRateVariabilities);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/heartRateVariability/addManyHeartRateVariability', 
            heartRateVariabilitiesDTOs,
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
    catch (error){
      console.log(error)
    }
};

/**
 * Converts array of HealthValues to array of IHeartRateVariabilityDTO.
 * @param heartRateVariabilities 
 * @returns Array<IHeartRateVariabilityDTO>
 */
function convertHeartRateVariabilities(userId: string, heartRateVariabilities: Array<HealthValue>): Array<IHeartRateVariabilityDTO> {
  // Initialize array of IHeartRateSampleDTO
  var heartRateVariabilityDTOs: Array<IHeartRateVariabilityDTO> = [];
  heartRateVariabilities.forEach(sample => {
    const heartRateVariabilitity: IHeartRateVariabilityDTO = {
      userID: userId,
      startDate: new Date(sample.startDate),
      variability: Number(sample.value),
      hkID: sample.id,
      hkWasUserEntered: Boolean(sample.metadata.HKWasUserEntered)
    }
    // Add each sample
    heartRateVariabilityDTOs.push(heartRateVariabilitity)
  }
  );
  return heartRateVariabilityDTOs;

}