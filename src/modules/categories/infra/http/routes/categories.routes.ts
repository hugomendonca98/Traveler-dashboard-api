import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRoutes = Router();
const categoriesController = new CategoriesController();

categoriesRoutes.get('/', ensureAuth, categoriesController.Index);

categoriesRoutes.post(
  '/',
  ensureAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      icon: Joi.string().min(2).required(),
    },
  }),
  categoriesController.Create,
);

categoriesRoutes.delete('/:id', ensureAuth, categoriesController.Delete);

categoriesRoutes.put(
  '/:id',
  ensureAuth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      icon: Joi.string().min(2).required(),
    },
  }),
  categoriesController.Update,
);

export default categoriesRoutes;
