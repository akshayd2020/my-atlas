export interface IMindfulSession {
  _id: String;
  userID: String;
  startDate: Date;
  duration: number;
}

export interface IMindfulSessionDTO {
  userID: String;
  startDate: Date;
  duration: number;
}

export interface IMindfulSessionLocal {
  userID: String;
  startDate: Date;
  duration: number;
}

