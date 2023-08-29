export interface IRestingHeartRate {
    _id: string;
    userID: string;
    startDate: Date;
    bpm: number;
    hkID: string;
    hkWasUserEntered: boolean;
  }
  
  export interface IRestingHeartRateDTO {
    userID: string;
    startDate: Date;
    bpm: number;
    hkID: string;
    hkWasUserEntered: boolean;
  }
  
   
  export interface IRestingHeartRateLocal {
    userID: string;
    startDate: Date;
    bpm: number;
  }
  