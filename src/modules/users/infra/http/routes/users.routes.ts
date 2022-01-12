import { Router } from "express";

import UsersController from "@modules/users/infra/http/controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        }
    }),
    usersController.Create
);

export default usersRouter;