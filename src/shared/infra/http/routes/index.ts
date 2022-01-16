import { Router } from 'express';

import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import categoriesRoutes from '@modules/categories/infra/http/routes/categories.routes';
import citiesRouter from '@modules/cities/infra/http/routes/cities.routes';

const routes = Router();

routes.use('/signup', usersRouter);
routes.use('/signin', sessionRouter);
routes.use('/category', categoriesRoutes);
routes.use('/city', citiesRouter);

export default routes;
