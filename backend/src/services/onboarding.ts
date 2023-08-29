import { Service, Inject } from 'typedi';
import { IOnboarding, IOnboardingInputDTO } from '@/interfaces/IOnboarding';
import MailerService from './mailer';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import { IGPS, IGPSInputDTO } from '@/interfaces/IGPS';

@Service()
export default class OnboardingService {
  constructor(
    @Inject('onboardingModel') private onboardingModel: Models.OnboardingModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  // Takes in an onboardingInputDTO and adds to to the database. Returns the added onboarding data
  // if there were no problems. Otherwise returns the error
  public async addOnboarding(onboardingInputDTO: IOnboardingInputDTO): Promise<{ onboarding: IOnboarding }> {
    try {
      this.logger.debug(onboardingInputDTO);
      const onboardingRecord = await this.onboardingModel.create({
        ...onboardingInputDTO,
      });
      const onboarding: IOnboarding = onboardingRecord.toObject();
      return { onboarding };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // adds multiple onboarding models to the database
  public async addManyOnboarding(
    onboardingInputDTO: IOnboardingInputDTO[],
  ): Promise<{ onboardingMany: IOnboarding[] }> {
    try {
      this.logger.debug(onboardingInputDTO);
      const onboardingRecord = await this.onboardingModel.create(onboardingInputDTO);
      const onboardingMany: IOnboarding[] = [];
      for (let i = 0; i < onboardingRecord.length; i++) {
        const onboarding: IOnboarding = onboardingRecord[i].toObject();
        onboardingMany.push(onboarding);
      }
      return { onboardingMany };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Gets the onboarding information associated with the given userID (not the
  // objectID). Others returns an error if there is no onbarding information associated
  // with the given ID
  public async getOnboarding(userID: string): Promise<{ onboarding: IOnboarding }> {
    try {
      const onboardingRecord = await this.onboardingModel.findOne({ userID: userID });
      const onboarding: IOnboarding = onboardingRecord.toObject();
      console.log(onboarding);
      return { onboarding };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  // Gets a boolean if the user has completed the personaity test
  public async getPersonalityTestCompleted(userID: string): Promise<{ personalityTestCompleted: boolean }> {
    try {
      const onboardingRecord = await this.onboardingModel.findOne({ userID: userID });
      const onboarding: IOnboarding = onboardingRecord.toObject();
      const personalityTestCompleted = onboarding.personalityTestCompleted;
      return { personalityTestCompleted };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Deletes the onboarding information associated with the given userID (not the
  // objectID). Returns the deleted onbaording data. Otherwise returns an error
  // if the data could not be deleted.
  public async deleteOnboardingByUserID(userID: string): Promise<{ onboarding: IOnboarding }> {
    try {
      const onboardingRecord = await this.onboardingModel.findOneAndDelete({ userID: userID });
      const onboarding: IOnboarding = onboardingRecord.toObject();
      return { onboarding };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // Takes in onboardingInputDTO and uses the userID within to update the onboarding data associated with
  // the given id. Returns an error if it could not update, either due to no onboarding data associated with
  // the given id or could not be updated for anotehr reason
  public async updateOnboardingByUserID(onboardingInputDTO: IOnboardingInputDTO): Promise<{ onboarding: IOnboarding }> {
    try {
      const userID = onboardingInputDTO.userID;
      const onboardingRecord = await this.onboardingModel.findOneAndUpdate({ userID: userID }, onboardingInputDTO, {
        runValidators: true
      }); // new implies we want to return the new document
      const onboarding: IOnboarding = onboardingRecord.toObject();
      return { onboarding };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
