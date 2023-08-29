export interface IOnboarding {
  userID: string;
  nickname: string;
  city: string;
  zipcode: number;
  religion: string;
  religionOther: string;
  ethnicity: string;
  sexualOrientation: string;
  identifyYourself: string;
  gender: string;
  genderOther: string;
  pronouns: string;
  pronounsOther: string;
  concerns: string[];
  goals: string[];
  personalityTestScore: number[];
}

export interface IOnboardingInputDTO {
  userID: string;
  nickname: string;
  city: string;
  zipcode: number;
  religion: string;
  religionOther: string;
  ethnicity: string;
  sexualOrientation: string;
  identifyYourself: string;
  gender: string;
  genderOther: string;
  pronouns: string;
  pronounsOther: string;
  concerns: string[];
  goals: string[];
  personalityTestScore: number[];
}
