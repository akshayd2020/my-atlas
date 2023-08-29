import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '../../src/decorators/eventDispatcher';
import {
  IHeartRateVariability,
  IHeartRateVariabilityAverage,
  IHeartRateVariabilityDTO,
} from '@/interfaces/IHeartRateVariability';
import {
  IHeartRateSample,
  IHeartRateSampleAverage,
  IHeartRateSampleDTO,
} from '@/interfaces/IHeartRateSample';

@Service()
export default class HeartRateVariabilityService {
  constructor(
    // Add services/models
    @Inject('heartRateVariabilityModel') private heartRateVariabilityModel: Models.HeartRateVariabilityModel, // connection to database and enables CRUD commands
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // add heart rate variability to database
  public async addHeartRateVariability(
    heartRateVariabilityDTO: IHeartRateVariabilityDTO,
  ): Promise<{ heartRateVariability: IHeartRateVariability }> {
    try {
      const heartRateVariabilityRecord = await this.heartRateVariabilityModel.create({
        ...heartRateVariabilityDTO,
      });
      const heartRateVariability: IHeartRateVariability = heartRateVariabilityRecord.toObject();
      return { heartRateVariability };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Adds multiple heart rate variability models
  public async addManyHeartRateVariability(
    heartRateVariabilityDTO: IHeartRateVariabilityDTO[],
  ): Promise<{ heartRateMany: IHeartRateVariability[] }> {
    try {
      this.logger.debug(heartRateVariabilityDTO);
      const heartRateRecord = await this.heartRateVariabilityModel.create(heartRateVariabilityDTO);
      const heartRateMany: IHeartRateVariability[] = [];
      for (let i = 0; i < heartRateRecord.length; i++) {
        const heartRate: IHeartRateVariability = heartRateRecord[i].toObject();
        heartRateMany.push(heartRate);
      }
      return { heartRateMany };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // get heart rate variability from database
  public async getHeartRateVariabilityByID(id: string): Promise<{ heartRateVariability: IHeartRateVariability }> {
    try {
      const heartRateVariabilityRecord = await this.heartRateVariabilityModel.findById(id);
      const heartRateVariability: IHeartRateVariability = heartRateVariabilityRecord.toObject();
      return { heartRateVariability };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Gets the heartRateVariabililty information associated with the given userID (not the
  // objectID) with a specified range.
  public async getHeartRateVariabilityByDateRange(
    userID: string,
    startDate: Date,
    endDate: Date,
  ): Promise<IHeartRateVariability[]> {
    try {
      const HeartRateVariabilityRecords: IHeartRateVariability[] = await this.heartRateVariabilityModel.aggregate([
        {
          $match: {
            userID: userID,
            startDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
      ]);
      return HeartRateVariabilityRecords;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Gets the average heartRateVariabililty information associated with the given userID between two dates
  public async getAverageHeartRateVariabilityByDateRange(
    userID: string,
    startDate: Date,
    endDate: Date,
  ): Promise<IHeartRateVariabilityAverage> {
    try {
      const iHeartRateAverage: IHeartRateVariabilityAverage[] = await this.heartRateVariabilityModel.aggregate([
        {
          $match: {
            userID: userID,
            startDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: '$userID',
            averageBPM: { $avg: '$bpm' },
          },
        },
      ]);
      return iHeartRateAverage[0];
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Deletes the heart rate variability associated with the given ID
  public async deleteHeartRateVariabilityByID(id: string): Promise<{ heartRateVariability: IHeartRateVariability }> {
    try {
      const heartRateVariabilityRecord = await this.heartRateVariabilityModel.findByIdAndDelete(id);
      const heartRateVariability: IHeartRateVariability = heartRateVariabilityRecord.toObject();
      return { heartRateVariability };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
