import { Router } from "express";

import sessionRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import dashboardRouter from "@modules/users/infra/http/routes/dashboard.routes";

const routes = Router();

routes.use('/dashboard', dashboardRouter);
routes.use('/signup', usersRouter);
routes.use('/signin', sessionRouter);

export default routes;