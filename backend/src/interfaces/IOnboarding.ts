import { IPersonalityScore } from '@/interfaces/IPersonalityScore';

export interface IOnboarding {
  _id: string;
  userID: string;
  city?: string;
  zipcode?: number;
  religion?: string;
  religionOther?: string;
  ethnicity?: string;
  sexualOrientation?: string;
  sexAssignedAtBirth?: string;
  mentalHealthCare?: string;
  haveSoughtCare?: boolean;
  identifyYourself?: string;
  gender?: string;
  genderOther?: string;
  pronouns?: string;
  pronounsOther?: string;
  spiritual?: boolean;
  concerns?: string[];
  goals?: string[];
  personalityTestScore?: IPersonalityScore;
  personalityTestCompleted?: boolean;
}


export interface IOnboardingInputDTO {
  userID: string;
  city?: string;
  zipcode?: number;
  religion?: string;
  religionOther?: string;
  ethnicity?: string;
  sexualOrientation?: string;
  sexAssignedAtBirth?: string;
  mentalHealthCare?: string;
  haveSoughtCare?: boolean;
  identifyYourself?: string;
  gender?: string;
  genderOther?: string;
  pronouns?: string;
  pronounsOther?: string;
  spiritual?: boolean;
  concerns?: string[];
  goals?: string[];
  personalityTestScore?: IPersonalityScore;
  personalityTestCompleted?: boolean;
}
