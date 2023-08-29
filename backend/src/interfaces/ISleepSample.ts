export interface ISleepSample {
  _id: string;
  userID: string;
  startDate: Date;
  duration: number;
  sleepState: string;
}
export interface ISleepSampleSum {
  _id: string;
  sleepState: string;
  sleepSum: number;
}
export interface ISleepSampleDTO {
  userID: string;
  startDate: Date;
  duration: number;
  sleepState: string;
}
