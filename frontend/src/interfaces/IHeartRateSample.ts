export interface IHeartRateSample {
    _id: string;
    userID: string;
    startDate: Date;
    bpm: number;
    hkID: string;
    hkWasUserEntered: boolean;
  }
  
  export interface IHeartRateSampleDTO {
    userID: string;
    startDate: Date;
    bpm: number;
    hkID: string;
    hkWasUserEntered: boolean;
  }

  export interface IHeartRateSampleLocal{
    userID: string;
    startDate: Date;
    bpm: number;

  }
  