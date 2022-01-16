import AppError from '@shared/errors/appError';
import crypto from 'crypto';
import { Request } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  uploadsFolder: string;
  tempFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: Record<string, unknown>;
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  multer: {
    limits: { fileSize: 7340032 },

    // Permitindo apenas formatos de imagens.
    fileFilter(
      _req: Request,
      file: Express.Multer.File,
      callback: (arg0: AppError | null, arg1: boolean | undefined) => void,
    ) {
      const ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new AppError('Only images are allowed'), false);
      }
      return callback(null, true);
    },

    storage: multer.diskStorage({
      destination: tempFolder,
      filename(_request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'bucket da aws aqui',
    },
  },
} as IUploadConfig;
