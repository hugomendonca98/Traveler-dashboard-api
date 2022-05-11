import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import DepositionModerationController from '../controllers/DepositionModerationController';

const depositionModerationRouter = Router();
const depositionModerationController = new DepositionModerationController();

depositionModerationRouter.put(
  '/:id',
  ensureAuth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  depositionModerationController.update,
);

export default depositionModerationRouter;
