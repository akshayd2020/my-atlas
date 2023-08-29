import { Service, Inject } from 'typedi';
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { IHeadphoneAudioExposure, IHeadphoneAudioExposureDTO } from '../interfaces/IHeadphoneAudioExposure';
import { IEnvironmentalAudioExposure } from '@/interfaces/IEnvironmentalAudioExposure';
import {IGPS, IGPSInputDTO} from "@/interfaces/IGPS";

@Service()
export default class HeadphoneExposureSample {
  constructor(
    // Add services/models
    @Inject('headphoneAudioExposureModel') private headphoneAudioExposureModel: Models.HeadphoneAudioExposureModel, // connection to database and enables CRUD commands
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // add headphoneExposure to database
  public async addHeadphoneAudioExposure(
    IHeadphoneExposureSampleDTO: IHeadphoneAudioExposureDTO,
  ): Promise<{ headphoneExposure: IHeadphoneAudioExposure }> {
    try {
      const exposureRecord = await this.headphoneAudioExposureModel.create({
        ...IHeadphoneExposureSampleDTO,
      });
      const headphoneExposure: IHeadphoneAudioExposure = exposureRecord.toObject();
      return { headphoneExposure };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  //gets and aggregates a headphoneExposure by startDate
  public async readHeadphoneAudioExposure(
    userID: string,
    startDate: Date,
    endDate: Date,
  ): Promise<IHeadphoneAudioExposure[]> {
    try {
      return this.headphoneAudioExposureModel.aggregate([
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
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Gets the headphone audio exposure information associated with the given userID (not the
  // objectID) with a specified range. Others returns an error if there is no mindfulSession
  // information associated with the given ID in the given range
  public async getHeadphoneAudioExposureByDateRange(
    userID: string,
    startDate: Date,
    endDate: Date,
  ): Promise<IHeadphoneAudioExposure[]> {
    try {
      const headphoneAudioExposureRecords: IHeadphoneAudioExposure[] = await this.headphoneAudioExposureModel.aggregate([
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
      return headphoneAudioExposureRecords;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // adds multiple headphone models to the database
  public async addManyHeadphoneAudioExposure(
    headphoneAudioExposureDTO: IHeadphoneAudioExposureDTO[],
  ): Promise<{ headphoneMany: IHeadphoneAudioExposure[] }> {
    try {
      this.logger.debug(headphoneAudioExposureDTO);
      const headphoneRecord = await this.headphoneAudioExposureModel.create(headphoneAudioExposureDTO);
      const headphoneMany: IHeadphoneAudioExposure[] = [];
      for (let i = 0; i < headphoneRecord.length; i++) {
        const headphone: IHeadphoneAudioExposure = headphoneRecord[i].toObject();
        headphoneMany.push(headphone);
      }
      return { headphoneMany };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Deletes the headphoneExposureSample associated with the given userID and date
  // Returns a message if successfully deleted activity information from the database
  public async deleteHeadphoneExposureSampleByIDAndDate(
    userID: string,
    startDate: Date,
  ): Promise<{ headphoneExposure: IHeadphoneAudioExposure }> {
    try {
      const headphoneExposureRecord = await this.headphoneAudioExposureModel.findOneAndDelete({
        userID: userID,
        startDate: Date,
      });
      const headphoneExposure: IHeadphoneAudioExposure = headphoneExposureRecord.toObject();
      return { headphoneExposure };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
