export interface IHeartRateVariability {
  _id: string;
  userID: string;
  startDate: Date;
  variability: number;
  hkID: string;
  hkWasUserEntered: boolean;
}
export interface IHeartRateVariabilityAverage {
  _id: string;
  averageBPM: number;
}
export interface IHeartRateVariabilityDTO {
  userID: string;
  startDate: Date;
  variability: number;
  hkID: string;
  hkWasUserEntered: boolean;
}
