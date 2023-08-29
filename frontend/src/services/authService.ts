import axios from 'axios';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

export type AuthData = {
  user: IUser;
  token: string;
};

const signIn = (email: string, password: string): Promise<AuthData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .post('http://localhost:3000/api/auth/signIn', {
          email,
          password,
        })
        .then(
          response => {
            console.log(response.data);
            resolve({
              user: response.data.user,
              token: response.data.token,
            });
          },
          error => {
            console.log(error.response.data.errors.message);
            reject(error.response.data.errors.message);
          },
        );
    });
  });
};

const signUp = (userInput: IUserInputDTO): Promise<AuthData> => {
    setItemAsync("LastRetrievalDate", new Date().toISOString())
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post('http://localhost:3000/api/auth/signUp', {
              ...userInput
            })
            .then(
              response => {
                console.log(response.data);
                resolve({
                  user: response.data.user,
                  token: response.data.token,
                });
              },
              error => {
                console.log(error.message);
                reject(error);
              },
            );
        });
      });
}

export const authService = {
  signIn,
  signUp
};