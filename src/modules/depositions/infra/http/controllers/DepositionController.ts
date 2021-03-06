import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import CityRepository from '@modules/cities/infra/typeorm/repositories/CityRepository';
import CreateDepositionService from '@modules/depositions/services/CreateDepositionService';
import PlaceRepository from '@modules/places/infra/typeorm/repositories/PlaceRepository';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/implementations/S3StorageProvider';
import DepositionRepository from '../../typeorm/repositories/DepositionRepository';

export default class DepositionContoller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, stars } = request.body;
    const { id } = request.params;
    const avatar = request.file?.filename;

    const cityRepository = new CityRepository();
    const placeRepository = new PlaceRepository();
    const storageProvider =
      process.env.STORAGE_DRIVER === 's3'
        ? new S3StorageProvider()
        : new DiskStorageProvider();
    const depositionRepository = new DepositionRepository();

    const createDepositionService = new CreateDepositionService(
      depositionRepository,
      storageProvider,
      cityRepository,
      placeRepository,
    );

    const deposition = await createDepositionService.execute({
      name,
      description,
      avatar,
      stars: Number(stars),
      moderation_status: 'waiting',
      place_id: id,
    });

    return response.json(instanceToInstance(deposition));
  }
}
