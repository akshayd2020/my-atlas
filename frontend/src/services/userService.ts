import axios from "axios";
import { IUser } from "../interfaces/IUser";

export const getUser = (token: string): Promise<IUser> => {
    const headers = {
        'Authorization': 'Bearer ' + token,
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get('http://localhost:3000/api/users/me', {headers})
          .then(
            response => {
              resolve(response.data.user);
            },
            error => {
  
              reject(error.response.data.errors.message);
            },
          );
      });
    });
  };

  export const updateUserDataDate = (_id: string, date: Date, token: string): Promise<IUser> => {
    const headers = {
        'Authorization': 'Bearer ' + token,
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .patch('http://localhost:3000/api/users/updateUserDataDate', {_id: _id, date: date},{headers})
          .then(
            response => {
     
              resolve(response.data);
            },
            error => {
              
              reject(error.response.data.errors.message);
            },
          );
      });
    });
  };