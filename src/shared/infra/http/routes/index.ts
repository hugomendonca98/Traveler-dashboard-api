import { Router } from 'express';

import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import categoriesRoutes from '@modules/categories/infra/http/routes/categories.routes';

const routes = Router();

routes.use('/signup', usersRouter);
routes.use('/signin', sessionRouter);
routes.use('/category', categoriesRoutes);

export default routes;
