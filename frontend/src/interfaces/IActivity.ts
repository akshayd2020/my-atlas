export interface IActivity {
    _id: string
    date: Date; // date when user opened app
    userID: string;
    dailyStepCountSamples?: number;
    dailyDistanceWalkingRunningSamples?: number;
    dailyDistanceSwimmingSamples?: number;
    dailyDistanceCyclingSamples?: number;
    dailyFlightsClimbedSamples?: number;
    activeEnergyBurned?: number;
    basalEnergyBurned?: number;
    appleStandTime?: number;
}

export interface IActivityDTO {
    date: Date; // date when user opened app
    userID: string;
    dailyStepCountSamples?: number;
    dailyDistanceWalkingRunningSamples?: number;
    dailyDistanceSwimmingSamples?: number;
    dailyDistanceCyclingSamples?: number;
    dailyFlightsClimbedSamples?: number;
    activeEnergyBurned?: number;
    basalEnergyBurned?: number;
    appleStandTime?: number;
 }