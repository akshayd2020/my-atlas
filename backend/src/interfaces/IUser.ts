export interface IUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dob: string;
  password: string;
  salt: string;
  lastDateDataRetrieved: Date;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dob: string;
}
