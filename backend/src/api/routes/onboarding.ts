import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IOnboardingInputDTO } from '@/interfaces/IOnboarding';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import OnboardingService from '@/services/onboarding';
import middlewares from '@/api/middlewares';

const route = Router();
export default (app: Router) => {
  app.use('/onboarding', route);

  /*
  Adds an onboarding model to the database and returns the entry added
  */
  route.post(
    '/addOnboarding',
    middlewares.isAuth,
    middlewares.authorizeUser,
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        city: Joi.string(),
        zipcode: Joi.string(),
        religion: Joi.string(),
        religionOther: Joi.string(),
        ethnicity: Joi.string(),
        sexualOrientation: Joi.string(),
        sexAssignedAtBirth: Joi.string(),
        mentalHealthCare: Joi.string(),
        haveSoughtCare: Joi.boolean(),
        spiritual: Joi.boolean(),
        identifyYourself: Joi.string(),
        gender: Joi.string(),
        genderOther: Joi.string(),
        pronouns: Joi.string(),
        pronounsOther: Joi.string(),
        concerns: Joi.array(),
        goals: Joi.array(),
        personalityTestScore: Joi.object(),
        personalityTestCompleted: Joi.boolean(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const OnboardingServiceInstance = Container.get(OnboardingService);
        const { onboarding } = await OnboardingServiceInstance.addOnboarding(req.body as IOnboardingInputDTO);
        return res.status(201).json({ onboarding });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // post endpoint for adding multiple onboarding models
  route.post(
    '/addManyOnboarding',
    middlewares.isAuth,
    middlewares.authorizeUser,
    celebrate({
      body: Joi.array().items({
        userID: Joi.string().required(),
        city: Joi.string(),
        zipcode: Joi.string(),
        religion: Joi.string(),
        religionOther: Joi.string(),
        ethnicity: Joi.string(),
        sexualOrientation: Joi.string(),
        sexAssignedAtBirth: Joi.string(),
        mentalHealthCare: Joi.string(),
        haveSoughtCare: Joi.string(),
        spiritual: Joi.boolean(),
        identifyYourself: Joi.string(),
        gender: Joi.string(),
        genderOther: Joi.string(),
        pronouns: Joi.string(),
        pronounsOther: Joi.string(),
        concerns: Joi.array(),
        goals: Joi.array(),
        personalityTestScore: Joi.object(),
        personalityTestCompleted: Joi.boolean(),}),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling addManyOnboarding endpoint with body: %o', req.body);
      try {
        const OnboardingServiceInstance = Container.get(OnboardingService);
        const { onboardingMany } = await OnboardingServiceInstance.addManyOnboarding(req.body);
        return res.status(201).json(onboardingMany);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
  Returns an onboarding model by providing the userID
   */
  route.get(
    '/getOnboarding/:id',
    middlewares.isAuth,
    middlewares.authorizeUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getOnboarding endpoint');
      try {
        const { id } = req.params;
        const OnboardingServiceInstance = Container.get(OnboardingService);
        const { onboarding } = await OnboardingServiceInstance.getOnboarding(id);
        return res.json({ onboarding }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  /*
 Returns the boolean personalityTestCompleted
  */
  route.get(
    '/getPersonalityTestCompleted/:id',
    middlewares.isAuth,
    middlewares.authorizeUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getPersonalityTestCompleted endpoint');
      try {
        const { id } = req.params;
        const OnboardingServiceInstance = Container.get(OnboardingService);
        const { personalityTestCompleted } = await OnboardingServiceInstance.getPersonalityTestCompleted(id);
        return res.json(personalityTestCompleted).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
  Deletes an onboarding model by providing the userID
   */
  route.delete(
    '/deleteOnboarding/:id',
    middlewares.isAuth,
    middlewares.authorizeUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling deleteOnboarding endpoint');
      try {
        const OnboardingServiceInstance = Container.get(OnboardingService);
        const { onboarding } = await OnboardingServiceInstance.deleteOnboardingByUserID(req.params.id);
        return res.json({ onboarding }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
  Updated an onboarding model by the given userID
   */
  route.patch(
    '/updateOnboarding',
    middlewares.isAuth,
    middlewares.authorizeUser,
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        city: Joi.string(),
        zipcode: Joi.string(),
        religion: Joi.string(),
        religionOther: Joi.string(),
        ethnicity: Joi.string(),
        sexualOrientation: Joi.string(),
        sexAssignedAtBirth: Joi.string(),
        mentalHealthCare: Joi.string(),
        haveSoughtCare: Joi.string(),
        spiritual: Joi.boolean(),
        identifyYourself: Joi.string(),
        gender: Joi.string(),
        genderOther: Joi.string(),
        pronouns: Joi.string(),
        pronounsOther: Joi.string(),
        concerns: Joi.array(),
        goals: Joi.array(),
        personalityTestScore: Joi.object(),
        personalityTestCompleted: Joi.boolean(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling updateOnboarding endpoint');
      try {
        const OnboardingServiceInstance = Container.get(OnboardingService);
        const { onboarding } = await OnboardingServiceInstance.updateOnboardingByUserID(
          req.body as IOnboardingInputDTO,
        );
        return res.json({ onboarding }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
