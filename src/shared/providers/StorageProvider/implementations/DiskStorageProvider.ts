import uploadConfig from '@config/upload';
import AppError from '@shared/errors/appError';
import fs from 'fs';
import path from 'path';

import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    try {
      await fs.promises.rename(
        path.resolve(uploadConfig.tempFolder, file),
        path.resolve(uploadConfig.uploadsFolder, file),
      );
    } catch (error) {
      throw new AppError('There was an error loading the file.');
    }

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
