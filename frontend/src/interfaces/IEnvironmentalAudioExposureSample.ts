export interface IEnvironmentalAudioExposureSample {
  _id: string;
  userID: string;
  startDate: Date;
  duration: number;
  value: number;
  hkID: string;
}

export interface IEnvironmentalAudioExposureSampleDTO {
  userID: string;
  startDate: Date;
  duration: number;
  value: number;
  hkID: string;
}

export interface IEnvironmentalAudioExposureLocal {
  userID: string;
  startDate: Date;
  value: number;
}
