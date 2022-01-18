import uploadConfig from '@config/upload';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import CitiesController from '../controllers/CitiesController';

const citiesRouter = Router();
const upload = multer(uploadConfig.multer);
const citiesController = new CitiesController();

citiesRouter.get('/', ensureAuth, citiesController.Index);

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

citiesRouter.delete('/:id', ensureAuth, citiesController.Delete);

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
