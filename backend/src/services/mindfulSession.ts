import { Service, Inject } from 'typedi';
import { IMindfulSession, IMindfulSessionDTO, IMindfulSessionSum } from '@/interfaces/IMindfulSession';
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import {ISleepSample, ISleepSampleDTO, ISleepSampleSum} from '@/interfaces/ISleepSample';

@Service()
export default class MindfulSessionService {
  constructor(
    @Inject('mindfulSessionModel') private mindfulSessionModel: Models.MindfulSessionModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // Takes in a mindfulSessionDTO and adds to the database. Returns the added mindfulSession data
  // if there were no problems. Otherwise returns the error
  public async addMindfulSession(mindfulSessionDTO: IMindfulSessionDTO): Promise<{ mindfulSession: IMindfulSession }> {
    try {
      this.logger.debug(mindfulSessionDTO);
      const mindfulSessionRecord = await this.mindfulSessionModel.create({
        ...mindfulSessionDTO,
      });
      const mindfulSession: IMindfulSession = mindfulSessionRecord.toObject();
      return { mindfulSession };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
// Adds multiple mindful session  models to the database
  public async addManyMindfulSession(
    mindfulSessionDTO: IMindfulSessionDTO[],
  ): Promise<{ mindfulSessionMany: IMindfulSession[] }> {
    try {
      this.logger.debug(mindfulSessionDTO);
      const mindfulSessionRecord = await this.mindfulSessionModel.create(mindfulSessionDTO);
      const mindfulSessionMany: IMindfulSession[] = [];
      for (let i = 0; i < mindfulSessionRecord.length; i++) {
        const sleepSample: ISleepSample = mindfulSessionRecord[i].toObject();
        mindfulSessionMany.push(sleepSample);
      }
      return { mindfulSessionMany };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Gets the mindfulSession information associated with the given userID (not the
  // objectID) with a specified range. Others returns an error if there is no mindfulSession
  // information associated with the given ID in the given range
  public async getMindfulSessionByDateRange(
    userID: string,
    startDate: Date,
    endDate: Date,
  ): Promise<IMindfulSession[]> {
    try {
      const mindfulSessionRecords: IMindfulSession[] = await this.mindfulSessionModel.aggregate([
        {
          $match: {
            userID: userID,
            sessionDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
      ]);
      return mindfulSessionRecords;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // returns the sum of mindful sessions with a given  user id
  public async getSumMindfulSession(userID: string, startDate: Date, endDate: Date): Promise<IMindfulSessionSum> {
    try {
      const mindfulSessionSum: IMindfulSessionSum[] = await this.mindfulSessionModel.aggregate([
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
            sleepSum: { $sum: '$duration' },
          },
        },
      ]);
      return mindfulSessionSum[0];
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Deletes the mindfulSession information associated with the given userID (not the
  // objectID). Returns the deleted mindfulSession data. Otherwise returns an error
  // if the data could not be deleted.
  public async deleteMindfulSessionByUserID(userID: string): Promise<{ mindfulSession: IMindfulSession }> {
    try {
      const mindfulSessionRecord = await this.mindfulSessionModel.findOneAndDelete({ userID: userID });
      const mindfulSession: IMindfulSession = mindfulSessionRecord.toObject();
      return { mindfulSession };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
