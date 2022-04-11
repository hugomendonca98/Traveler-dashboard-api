import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import CitiesController from '../controllers/CitiesController';
import ShowCityController from '../controllers/ShowCityController';

const citiesRouter = Router();
const upload = multer(uploadConfig.multer);
const citiesController = new CitiesController();
const showCityController = new ShowCityController();

citiesRouter.get('/', citiesController.Index);

citiesRouter.get('/:id', showCityController.index);

citiesRouter.delete('/:id', ensureAuth, citiesController.Delete);

citiesRouter.post(
  '/',
  ensureAuth,
  upload.single('image'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      description: Joi.string().min(2).required(),
    },
  }),
  citiesController.Create,
);

citiesRouter.put(
  '/:id',
  ensureAuth,
  upload.single('image'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      description: Joi.string().min(2).required(),
    },
  }),
  citiesController.Update,
);

export default citiesRouter;
