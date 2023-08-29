export interface ISleepSample {
  _id: String;
  userID: String;
  startDate: Date;
  duration: number;
  sleepState: String;
}

export interface ISleepSampleDTO {
  userID: String;
  startDate: Date;
  duration: number;
  sleepState: String;
}

export interface ISleepSampleLocal {
  userID: String;
  startDate: Date;
  duration: number;
  sleepState: String;
}

