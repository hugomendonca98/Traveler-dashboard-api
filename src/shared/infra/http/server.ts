import dotenv from 'dotenv';
import '../typeorm';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/appError';
import { errors } from 'celebrate';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errors());

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      console.log(err);
      return response.status(err.statusCode).json(err);
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(port, () => console.log(`Rodando na porta ${port}`));
