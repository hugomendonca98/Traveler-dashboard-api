import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRoutes = Router();
const upload = multer(uploadConfig.multer);
const categoriesController = new CategoriesController();

categoriesRoutes.get('/', ensureAuth, categoriesController.Index);

categoriesRoutes.post(
  '/',
  ensureAuth,
  upload.single('icon'),

  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
    },
  }),
  categoriesController.Create,
);

categoriesRoutes.delete('/:id', ensureAuth, categoriesController.Delete);

categoriesRoutes.put(
  '/:id',
  ensureAuth,
  upload.single('icon'),

  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
    },
  }),
  categoriesController.Update,
);

export default categoriesRoutes;
