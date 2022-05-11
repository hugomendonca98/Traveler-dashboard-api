import uploadConfig from '@config/upload';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import PlaceController from '../controllers/PlaceController';
import PlacesController from '../controllers/PlacesController';

const placeRouters = Router();
const upload = multer(uploadConfig.multer);
const placesController = new PlacesController();
const placeController = new PlaceController();

placeRouters.get('/', placesController.Index);

placeRouters.get('/:id', placeController.Index);

placeRouters.delete('/:id', ensureAuth, placesController.Delete);

placeRouters.post(
  '/',
  ensureAuth,
  upload.single('image'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(2),
      description: Joi.string().required().min(2),
      city_id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
      address_id: Joi.string().uuid().required(),
    },
  }),
  placesController.Create,
);

placeRouters.put(
  '/:id',
  ensureAuth,
  upload.single('image'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(2),
      description: Joi.string().required().min(2),
      city_id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
      address_id: Joi.string().uuid().required(),
    },
  }),
  placesController.Update,
);

export default placeRouters;
