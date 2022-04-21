import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import CityRepository from '@modules/cities/infra/typeorm/repositories/CityRepository';
import CreateDepositionService from '@modules/depositions/services/CreateDepositionService';
import PlaceRepository from '@modules/places/infra/typeorm/repositories/PlaceRepository';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import DepositionRepository from '../../typeorm/repositories/DepositionRepository';

export default class DepositionContoller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, stars } = request.body;
    const { id } = request.params;
    const avatar = request.file?.filename;

    const cityRepository = new CityRepository();
    const placeRepository = new PlaceRepository();
    const storagedProvider = new DiskStorageProvider();
    const depositionRepository = new DepositionRepository();

    const createDepositionService = new CreateDepositionService(
      depositionRepository,
      storagedProvider,
      cityRepository,
      placeRepository,
    );

    const deposition = await createDepositionService.execute({
      name,
      description,
      avatar,
      stars,
      place_id: id,
    });

    return response.json(instanceToInstance(deposition));
  }
}
