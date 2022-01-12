import { Router } from "express";
import { Joi, celebrate, Segments } from 'celebrate';

import SessionController from "@modules/users/infra/http/controllers/SessionsController";

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    sessionController.Create
);

export default sessionRouter;