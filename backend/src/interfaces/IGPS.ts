// Inteface for IGPS,
// latatitude, longiitude, altitude, accuracy, and timestamp are optional incase they can't be retreived
export interface IGPS {
  _id: string;
  userID: string; // meta data for GPS, will use userID
  latitude?: number; // not sure if this should be a number or not, in expo it returns a number
  longitude?: number;
  altitude?: number;
  accuracy?: number;
  timestamp: Date;
}

export interface IGPSInputDTO {
  userID: string;
  latitude?: number; // not sure if this should be a number or not, in expo it returns a number
  longitude?: number;
  altitude?: number;
  accuracy?: number;
  timestamp: Date;
}
