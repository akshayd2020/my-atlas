import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { Container } from 'typedi';
import UserService from '@/services/user';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });
  route.patch(
    '/updateUserDataDate',
    middlewares.isAuth,
    middlewares.authorizeUser,
    celebrate({
      body: Joi.object({
        _id: Joi.string().required(),
        date: Joi.date().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling updateUserDataDate endpoint with body: %o', req.body);
      try {
        const userServiceInstance = Container.get(UserService);
        const user = await userServiceInstance.updateUserDate(req.body._id, req.body.date);
        return res.status(201).json(user );
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/getUserDataDate/:id',
    middlewares.isAuth,
    middlewares.authorizeUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling getUserDataDate endpoint with body: %o', req.body);
      try {
        const id = req.params.id;
        const userServiceInstance = Container.get(UserService);
        const date = await userServiceInstance.getUserDate(id);
        return res.status(200).json(date);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
