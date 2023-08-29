export interface IUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dob: string;
  lastDateDataRetrieved: Date;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dob: string;
}
