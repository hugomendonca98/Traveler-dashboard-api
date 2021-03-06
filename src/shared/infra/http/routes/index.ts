import { Router } from 'express';

import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import categoriesRoutes from '@modules/categories/infra/http/routes/categories.routes';
import citiesRouter from '@modules/cities/infra/http/routes/cities.routes';
import addressesRouter from '@modules/addresses/infra/http/routes/addresses.routes';
import placeRouters from '@modules/places/infra/http/routes/places.routes';
import depositionRouter from '@modules/depositions/infra/http/routes/deposition.routes';
import depositionModerationRouter from '@modules/depositions/infra/http/routes/moderation.routes';

const routes = Router();

routes.use('/signup', usersRouter);
routes.use('/signin', sessionRouter);
routes.use('/category', categoriesRoutes);
routes.use('/city', citiesRouter);
routes.use('/address', addressesRouter);
routes.use('/place', placeRouters);
routes.use('/deposition', depositionRouter);
routes.use('/moderation', depositionModerationRouter);

export default routes;
