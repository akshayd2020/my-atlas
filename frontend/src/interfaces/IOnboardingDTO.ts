import { IPersonalityScore } from "./IPersonalityScore";

export interface IOnboarding {
    _id: string;
    nickname?: string;
    city?: string;
    zipcode?: string;
    religion?: string;
    religionOther?: string;
    ethnicity?: string;
    sexualOrientation?: string;
    sexAssignedAtBirth?: string;
    mentalHealthCare?: string;
    haveSoughtCare?: string;
    identifyYourself?: string;
    gender?: string;
    genderOther?: string;
    pronouns?: string;
    pronounsOther?: string;
    spiritual?: string;
    concerns?: string[];
    goals?: string[];
    personalityTestScore?: IPersonalityScore;
  }
  
  export interface IOnboardingDTO {
    nickname?: string;
    city?: string;
    zipcode?: string;
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
  