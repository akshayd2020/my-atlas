import axios from 'axios';
import { IOnboarding, IOnboardingDTO } from '../interfaces/IOnboardingDTO';

const addOnboarding = (onboarding : IOnboardingDTO, userID : string, authToken : string): Promise<IOnboarding> => {
    const headers = {
        'Authorization': 'Bearer ' + authToken
    }
    const onboardingDTO = {
        ...onboarding,
        userID : userID
    }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .post('http://localhost:3000/api/onboarding/addOnboarding',
          onboardingDTO,
          {headers})
        .then(
          response => {
            console.log(response.data);
            resolve(
                response.data
            );
          },
          error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            reject(error);
          },
        );
    });
  });
};

const updateOnboardingByUserID = (onboarding : IOnboardingDTO, userID : string, authToken : string): Promise<IOnboarding> => {
    const headers = {
        'Authorization': 'Bearer ' + authToken
    }
    const onboardingDTO = {
        ...onboarding,
        userID : userID
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .patch('http://localhost:3000/api/onboarding/updateOnboarding',
              onboardingDTO,
              {headers}
            )
            .then(
              response => {
                console.log(response.data);
                resolve(
                  response.data
                );
              },
              error => {
                console.log(error);
                reject(error);
              },
            );
        });
      });
}

export const onboardingService = {
  addOnboarding,
  updateOnboardingByUserID
};