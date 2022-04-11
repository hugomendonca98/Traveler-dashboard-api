import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateCityService from '@modules/cities/services/CreateCityService';
import DeleteCityService from '@modules/cities/services/DeleteCityService';
import ListCityService from '@modules/cities/services/ListCityService';
import UpdateCityService from '@modules/cities/services/UpdateCityService';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import CityRepository from '../../typeorm/repositories/CityRepository';

export default class CitiesController {
  public async Create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const image = request.file?.filename;

    const cityRepositoy = new CityRepository();
    const storageProvider = new DiskStorageProvider();
    const createCityService = new CreateCityService(
      cityRepositoy,
      storageProvider,
    );

    const city = await createCityService.execute({
      name,
      image,
      description,
    });

    return response.json(city);
  }

  public async Delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const cityRepositoy = new CityRepository();

    const deleteCityService = new DeleteCityService(cityRepositoy);

    await deleteCityService.execute(id);

    return response.json({ message: 'City deleted successfully.' });
  }

  public async Update(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const { id } = request.params;
    const image = request.file?.filename;

    const cityRepositoy = new CityRepository();
    const storageProvider = new DiskStorageProvider();
    const updateCityService = new UpdateCityService(
      cityRepositoy,
      storageProvider,
    );

    const city = await updateCityService.execute({
      id,
      name,
      image,
      description,
    });

    return response.json(city);
  }

  public async Index(request: Request, response: Response): Promise<Response> {
    const cityRepositoy = new CityRepository();

    const listCityService = new ListCityService(cityRepositoy);

    const cities = await listCityService.execute();

    return response.json(instanceToInstance(cities));
  }
}
