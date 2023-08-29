export interface IHeadphoneAudioExposure {
  _id: string;
  userID: string;
  startDate: Date;
  duration: number;
  value: number;
  hkID: string;
}

export interface IHeadphoneAudioExposureDTO {
  userID: string;
  startDate: Date;
  duration: number;
  value: number;
  hkID: string;
}
