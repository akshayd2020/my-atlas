export interface IHeartRateVariability {
    _id: String;
    userID: String;
    startDate: Date;
    variability: number; // Seconds?
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  
  export interface IHeartRateVariabilityDTO {
    userID: String;
    startDate: Date;
    variability: number; // Seconds?
    hkID: String;
    hkWasUserEntered: Boolean;
  }
  

  export interface IHeartRateVariabilityLocal {
    userID: String;
    startDate: Date;
    variability: number; // Seconds?
  }
  