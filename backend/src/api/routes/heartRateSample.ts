import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IHeartRateSampleDTO } from '../../interfaces/IHeartRateSample';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import middlewares from "../middlewares";
import HeartRateSampleService from '@/services/heartRateSample';
import ActivityService from '@/services/activity';
import EnvironmentalAudioExposureService from '@/services/environmentalAudioExposure';

const route = Router();

export default (app: Router) => {
  app.use('/heartRateSample', route);

  // make post request to add heartRateSample
  route.post(
    '/addHeartRateSample',
    middlewares.isAuth, middlewares.authorizeUser,
    celebrate({
      body: Joi.object({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        bpm: Joi.number().required(),
        hkID: Joi.string().required(),
        hkWasUserEntered: Joi.boolean().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling addHeartRateSample endpoint with body: %o', req.body);
      try {
        const HeartRateSampleServiceInstance = Container.get(HeartRateSampleService);
        const { heartRateSample } = await HeartRateSampleServiceInstance.addHeartRateSample(
          req.body as IHeartRateSampleDTO,
        );
        return res.status(201).json({ heartRateSample });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // make post request for adding many heart rate sample models
  route.post(
    '/addManyHeartRateSample',
    middlewares.isAuth, middlewares.authorizeUser,
    celebrate({
      body: Joi.array().items({
        userID: Joi.string().required(),
        startDate: Joi.date().required(),
        bpm: Joi.number().required(),
        hkID: Joi.string().required(),
        hkWasUserEntered: Joi.boolean().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling addManyHeartRateSample endpoint with body: %o', req.body);
      try {
        const HeartRateSampleServiceInstance = Container.get(HeartRateSampleService);
        const { heartRateMany } = await HeartRateSampleServiceInstance.addManyHeartRateSample(req.body);
        return res.status(201).json(heartRateMany);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /*
 Returns an array of heartRateSamples by providing the userID, a startDate and an endDate.
  */
  route.get(
    '/getHeartRateSampleByDateRange/:id/',
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
      logger.debug('Calling getHeartRateSampleByDateRange endpoint');
      try {
        const HeartRateSampleServiceInstance: HeartRateSampleService = Container.get(
          HeartRateSampleService,
        );
        const heartRateSampleRecords = await HeartRateSampleServiceInstance.getHeartRateSampleByDateRange(
          req.body.userID,
          req.body.startDate,
          req.body.endDate,
        );
        return res.json({ heartRateSampleRecords }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  // returns an IHeartRateAverageSample with the average bpm
  route.get(
    '/getAverageHeartRateSample/:id/',
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
      logger.debug('Calling getAverageHeartRateSample endpoint');
      try {
        const HeartRateSampleServiceInstance: HeartRateSampleService = Container.get(HeartRateSampleService);
        const averageHeartRate = await HeartRateSampleServiceInstance.getAverageHeartRateSampleByDateRange(
          req.body.userID,
          req.body.startDate,
          req.body.endDate,
        );

        return res.json({ averageHeartRate }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  // make get request to retrieve heart rate sample, given id
  route.get('/getHeartRateAverage/id/:id/',
    middlewares.isAuth, middlewares.authorizeUser,
    async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling getHeartRateSampleByID endpoint');
    try {
      const id = req.params.id;
      const HeartRateSampleServiceInstance = Container.get(HeartRateSampleService);
      const { heartRateSample } = await HeartRateSampleServiceInstance.getHeartRateSampleByID(id);
      return res.json({ heartRateSample }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  // deletes heart rate sample given an id
  route.delete('/deleteHeartRateSampleByID/id/:id',
    middlewares.isAuth, middlewares.authorizeUser,
    async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling deleteHeartRateSampleByID endpoint');
    try {
      const id = req.params.id;
      const HeartRateSampleServiceInstance = Container.get(HeartRateSampleService);
      const { heartRateSample } = await HeartRateSampleServiceInstance.deleteHeartRateSampleByID(id);
      return res.json({ heartRateSample }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
