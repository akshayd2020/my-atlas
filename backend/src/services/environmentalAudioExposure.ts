import { Service, Inject } from 'typedi';
import { IEnvironmentalAudioExposure, IEnvironmentalAudioExposureDTO } from '@/interfaces/IEnvironmentalAudioExposure';
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import {IHeadphoneAudioExposure, IHeadphoneAudioExposureDTO} from "@/interfaces/IHeadphoneAudioExposure";

@Service()
export default class EnvironmentalAudioExposureService {
  constructor(
    @Inject('environmentalAudioExposureModel')
    private environmentalAudioExposureModel: Models.EnvironmentalAudioExposureModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // Takes in a environmentalAudioExposureDTO and adds to to the database. Returns the added environmentalAudioExposure data
  // if there were no problems. Otherwise returns the error
  public async addEnvironmentalAudioExposure(
    environmentalAudioExposureDTO: IEnvironmentalAudioExposureDTO,
  ): Promise<{ environmentalAudioExposure: IEnvironmentalAudioExposure }> {
    try {
      this.logger.debug(environmentalAudioExposureDTO);
      const environmentalAudioExposureRecord = await this.environmentalAudioExposureModel.create({
        ...environmentalAudioExposureDTO,
      });
      const environmentalAudioExposure: IEnvironmentalAudioExposure = environmentalAudioExposureRecord.toObject();
      return { environmentalAudioExposure };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // adds multiple environmental models to the database
  public async addManyEnvironmentalAudioExposure(
    environmentalAudioExposureDTO: IEnvironmentalAudioExposureDTO[],
  ): Promise<{ environmentalMany: IEnvironmentalAudioExposure[] }> {
    try {
      this.logger.debug(environmentalAudioExposureDTO);
      const environmentalRecord = await this.environmentalAudioExposureModel.create(environmentalAudioExposureDTO);
      const environmentalMany: IHeadphoneAudioExposure[] = [];
      for (let i = 0; i < environmentalRecord.length; i++) {
        const environment: IHeadphoneAudioExposure = environmentalRecord[i].toObject();
        environmentalMany.push(environment);
      }
      return { environmentalMany };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Gets the environmental audio exposure information associated with the given userID (not the
  // objectID) with a specified range. Others returns an error if there is no mindfulSession
  // information associated with the given ID in the given range
  public async getEnvironmentalAudioExposureByDateRange(
    userID: string,
    startDate: Date,
    endDate: Date,
  ): Promise<IEnvironmentalAudioExposure[]> {
    try {
      const environmentalAudioExposureRecords: IEnvironmentalAudioExposure[] = await this.environmentalAudioExposureModel.aggregate(
        [
          {
            $match: {
              userID: userID,
              startDate: {
                $gte: startDate,
                $lte: endDate,
              },
            },
          },
        ],
      );
      return environmentalAudioExposureRecords;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Deletes the mindfulSession information associated with the given userID (not the
  // objectID). Returns the deleted mindfulSession data. Otherwise returns an error
  // if the data could not be deleted.
  public async deleteEnvironmentalAudioExposureByUserID(
    userID: string,
  ): Promise<{ environmentalAudioExposure: IEnvironmentalAudioExposure }> {
    try {
      const environmentalAudioExposureRecord = await this.environmentalAudioExposureModel.findOneAndDelete({
        userID: userID,
      });
      const environmentalAudioExposure: IEnvironmentalAudioExposure = environmentalAudioExposureRecord.toObject();
      return { environmentalAudioExposure };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
