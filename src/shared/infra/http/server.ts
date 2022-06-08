import dotenv from 'dotenv';
import '../typeorm';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/appError';
import { MulterError } from 'multer';
import { errors } from 'celebrate';
import upload from '@config/upload';
import cors from 'cors';
import routes from './routes';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use('/files', express.static(upload.uploadsFolder));
app.use(errors());

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json(err);
    }

    if (err instanceof MulterError) {
      Object.assign(err, { statusCode: 400 });
      return response.status(400).json(err);
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(port, () => console.log(`Rodando na porta ${port}`));
