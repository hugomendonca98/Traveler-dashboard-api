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

citiesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  }),
  showCityController.index,
);

citiesRouter.delete(
  '/:id',
  ensureAuth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
  }),
  citiesController.Delete,
);

citiesRouter.post(
  '/',
  ensureAuth,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'localImage', maxCount: 1 },
  ]),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      description: Joi.string().min(2).required(),
      localName: Joi.string().min(2).required(),
      localDescription: Joi.string().min(2).required(),
      categoryId: Joi.string().min(2).required(),
      zip_code: Joi.string().min(2).required(),
      street: Joi.string().min(2).required(),
      neighborhood: Joi.string().min(2).required(),
      number: Joi.string().min(2).required(),
    },
  }),
  citiesController.Create,
);

citiesRouter.put(
  '/:id',
  ensureAuth,
  upload.single('image'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().guid({ version: 'uuidv4' }),
    },
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      description: Joi.string().min(2).required(),
    },
  }),
  citiesController.Update,
);

export default citiesRouter;
