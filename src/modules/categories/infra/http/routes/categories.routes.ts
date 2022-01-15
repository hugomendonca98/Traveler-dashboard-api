import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { Router } from 'express';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRoutes = Router();
const categoriesController = new CategoriesController();

categoriesRoutes.get('/', ensureAuth, categoriesController.Index);

export default categoriesRoutes;
