import { IUserInputDTO } from './IUser';

export interface IOnboardingFlowState {
  email: string;
  password: string
  name: string;
  phoneNumber: string;
  pronouns: string;
  pronounsOther: string;
  dob: string;
  zipcode: string;
  sexAssignedAtBirth: string;
  gender: string;
  genderOther: string;
  sexualOrientation: string;
  ethnicity: string;
  religion: string;
  religionOther: string;
  mentalHealthStance: string;
  soughtCare: boolean;
  concerns: string[];
  goals: string[];
  spirituality: boolean;
}
