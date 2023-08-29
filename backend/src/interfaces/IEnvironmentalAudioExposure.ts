export interface IEnvironmentalAudioExposure {
  _id: string;
  userID: string;
  startDate: Date;
  duration: number;
  value: number;
  hkID: string;
}

export interface IEnvironmentalAudioExposureDTO {
  userID: string;
  startDate: Date;
  duration: number;
  value: number;
  hkID: string;
}
