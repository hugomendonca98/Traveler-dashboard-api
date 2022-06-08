import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import DepositionContoller from '../controllers/DepositionController';

const depositionRouter = Router();
const upload = multer(uploadConfig.multer);
const depositionController = new DepositionContoller();

depositionRouter.post(
  '/:id',
  upload.single('avatar'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid({ version: 'uuidv4' }).required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      description: Joi.string().min(2).required(),
      stars: Joi.string().required(),
    },
  }),
  depositionController.create,
);

export default depositionRouter;
