import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IEnvironmentalAudioExposureDTO } from '@/interfaces/IEnvironmentalAudioExposure';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import EnvironmentalAudioExposureService from '@/services/environmentalAudioExposure';
import middlewares from "../middlewares";
const route = Router();
export default (app: Router) => {
  app.use('/environmentalAudioExposure', route);

  /*
  Adds a EnvironmentalAudioExposure model to the database and returns the entry added
  */
  route.post(
    '/addEnvironmentalAudioExposure',
    middlewares.isAuth, middlewares.authorizeUser,
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        duration: Joi.number().required(),
        value: Joi.number().required(),
        hkID: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling addEnvironmentalAudioExposure endpoint with body: %o', req.body);
      try {
        const EnvironmentalAudioExposureInstance = Container.get(EnvironmentalAudioExposureService);
        const { environmentalAudioExposure } = await EnvironmentalAudioExposureInstance.addEnvironmentalAudioExposure(
          req.body as IEnvironmentalAudioExposureDTO,
        );
        return res.status(201).json({ environmentalAudioExposure });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
  Returns an array of environmentalAudioExposures by providing the userID, a startDate and an endDate.
   */
  route.get(
    '/getEnvironmentalAudioExposureByDateRange/:id/',
    middlewares.isAuth, middlewares.authorizeUser,
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getEnvironmentalAudioExposureByDateRange endpoint');
      try {
        const EnvironmentalAudioExposureInstance: EnvironmentalAudioExposureService = Container.get(
          EnvironmentalAudioExposureService,
        );
        const environmentalAudioExposureRecords = await EnvironmentalAudioExposureInstance.getEnvironmentalAudioExposureByDateRange(
          req.body.userID,
          req.body.startDate,
          req.body.endDate,
        );
        return res.json({ environmentalAudioExposureRecords }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // make post request for adding many environmental  audio models
  route.post(
    '/addManyEnvironmentalAudioExposure',
    middlewares.isAuth, middlewares.authorizeUser,
    celebrate({
      body: Joi.array().items({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        duration: Joi.number().required(),
        value: Joi.number().required(),
        hkID: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling addManyEnvironmentalAudioExposure endpoint with body: %o', req.body);
      try {
        const EnvironmentalAudioExposureServiceInstance = Container.get(EnvironmentalAudioExposureService);
        const { environmentalMany } = await EnvironmentalAudioExposureServiceInstance.addManyEnvironmentalAudioExposure(req.body);
        return res.status(201).json(environmentalMany);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // gets average environmental audio expose over a date range
  route.get(
    '/getAverageEnvironmentalAudioExposureByDateRange/:id/',
    middlewares.isAuth, middlewares.authorizeUser,
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getEnvironmentalAudioExposureByDateRange endpoint');
      try {
        const EnvironmentalAudioExposureInstance: EnvironmentalAudioExposureService = Container.get(
          EnvironmentalAudioExposureService,
        );
        const environmentalAudioExposureRecords = await EnvironmentalAudioExposureInstance.getEnvironmentalAudioExposureByDateRange(
          req.body.userID,
          req.body.startDate,
          req.body.endDate,
        );
        let average = 0;
        let duration = 0;
        for (let i = 0; i < environmentalAudioExposureRecords.length; i++) {
          duration += environmentalAudioExposureRecords[i].duration;
        }
        for (let i = 0; i < environmentalAudioExposureRecords.length; i++) {
          average +=
            (environmentalAudioExposureRecords[i].duration / duration) * environmentalAudioExposureRecords[i].value;
        }
        return res.json({ average }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
  Deletes a EnvironmentalAudioExposure model by providing the userID
   */
  route.delete('/deleteEnvironmentalAudioExposure/:id',
    middlewares.isAuth, middlewares.authorizeUser,
    async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling deleteEnvironmentalAudioExposure endpoint');
    try {
      const EnvironmentalAudioExposureInstance = Container.get(EnvironmentalAudioExposureService);
      const {
        environmentalAudioExposure,
      } = await EnvironmentalAudioExposureInstance.deleteEnvironmentalAudioExposureByUserID(req.params.id);
      return res.json({ environmentalAudioExposure }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
