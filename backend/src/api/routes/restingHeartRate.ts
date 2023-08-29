import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IRestingHeartRateDTO } from '../../interfaces/IRestingHeartRate';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import RestingHeartRateService from '@/services/restingHeartRate';

import middlewares from "@/api/middlewares";

const route = Router();

export default (app: Router) => {
  app.use('/restingHeartRate', route);

  // make post request to add restingHeartRate
  route.post(
    '/addRestingHeartRate',
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
      logger.debug('Calling addRestingHeartRate endpoint with body: %o', req.body);
      try {
        const RestingHeartRateServiceInstance = Container.get(RestingHeartRateService);
        const { restingHeartRate } = await RestingHeartRateServiceInstance.addRestingHeartRate(
          req.body as IRestingHeartRateDTO,
        );
        return res.status(201).json({ restingHeartRate });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // make post request for adding many resting heart rate models
  route.post(
    '/addManyRestingHeartRate',
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
        const RestingHeartRateServiceInstance = Container.get(RestingHeartRateService);
        const { heartRateMany } = await RestingHeartRateServiceInstance.addManyRestingHeartRate(req.body);
        return res.status(201).json(heartRateMany);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // make get request to retrieve heart rate sample, given id
  route.get('/getRestingHeartRateByID/id/:id/',
    middlewares.isAuth, middlewares.authorizeUser, async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling getRestingHeartRateByID endpoint');
    try {
      const id = req.params.id;
      const RestingHeartRateServiceInstance = Container.get(RestingHeartRateService);
      const { restingHeartRate } = await RestingHeartRateServiceInstance.getRestingHeartRateByID(id);
      return res.json({ restingHeartRate }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  /*
Returns an array of restingHeartRate by providing the userID, a startDate and an endDate.
 */
  route.get(
    '/getRestingHeartRateByDateRange/:id/',
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
      logger.debug('Calling getRestingHeartRateByDateRange endpoint');
      try {
        const RestingHeartRateServiceInstance: RestingHeartRateService = Container.get(
          RestingHeartRateService,
        );
        const restingHeartRateRecords = await RestingHeartRateServiceInstance.getRestingHeartRateByDateRange(
          req.body.userID,
          req.body.startDate,
          req.body.endDate,
        );
        return res.json({ restingHeartRateRecords }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  // returns an IRestingHeartRateAverage with the average bpm
  route.get(
    '/getAverageRestingHeartRate/:id/',
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
      logger.debug('Calling getAverageRestingHeartRate endpoint');
      try {
        const RestingHeartRateServiceInstance: RestingHeartRateService = Container.get(RestingHeartRateService);
        const averageHeartRate = await RestingHeartRateServiceInstance.getAverageRestingHeartRateByDateRange(
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

  // deletes heart rate sample given an id
  route.delete('/deleteRestingHeartRateByID/id/:id',
    middlewares.isAuth, middlewares.authorizeUser, async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling deleteRestingHeartRateByID endpoint');
    try {
      const id = req.params.id;
      const RestingHeartRateServiceInstance = Container.get(RestingHeartRateService);
      const { restingHeartRate } = await RestingHeartRateServiceInstance.deleteRestingHeartRateByID(id);
      return res.json({ restingHeartRate }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
