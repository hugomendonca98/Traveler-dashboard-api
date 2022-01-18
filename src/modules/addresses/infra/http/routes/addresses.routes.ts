import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import AddressController from '../controllers/AddressController';

const addressesRouter = Router();
const addressController = new AddressController();

addressesRouter.get('/', ensureAuth, addressController.Index);

addressesRouter.post(
  '/',
  ensureAuth,
  celebrate({
    [Segments.BODY]: {
      zip_code: Joi.string().required(),
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      number: Joi.number(),
    },
  }),
  addressController.Create,
);

addressesRouter.delete('/:id', ensureAuth, addressController.Delete);

addressesRouter.put(
  '/:id',
  ensureAuth,
  celebrate({
    [Segments.BODY]: {
      zip_code: Joi.string().required(),
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      number: Joi.number(),
    },
  }),
  addressController.Update,
);

export default addressesRouter;
