import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreatePlaceService from '@modules/places/services/CreatePlaceService';
import DeletePlaceService from '@modules/places/services/DeletePlaceService';
import ListPlaceService from '@modules/places/services/ListPlaceService';
import UpdatePlaceService from '@modules/places/services/UpdatePlaceService';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import CityRepository from '@modules/cities/infra/typeorm/repositories/CityRepository';
import PlaceRepository from '../../typeorm/repositories/PlaceRepository';

export default class PlacesController {
  public async Create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      city_id,
      category_id,
      address_id,
    } = request.body;
    const image = request.file?.filename;

    const placeRepository = new PlaceRepository();
    const storageProvider = new DiskStorageProvider();
    const createPlaceService = new CreatePlaceService(
      placeRepository,
      storageProvider,
    );

    const place = await createPlaceService.execute({
      name,
      image,
      description,
      city_id,
      category_id,
      address_id,
    });

    return response.json(instanceToInstance(place));
  }

  public async Update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      city_id,
      category_id,
      address_id,
    } = request.body;
    const image = request.file?.filename;
    const { id } = request.params;

    const placeRepository = new PlaceRepository();
    const cityRepository = new CityRepository();
    const storageProvider = new DiskStorageProvider();
    const updatePlaceService = new UpdatePlaceService(
      placeRepository,
      cityRepository,
      storageProvider,
    );

    const place = await updatePlaceService.execute({
      id,
      name,
      image,
      description,
      city_id,
      category_id,
      address_id,
    });

    return response.json(instanceToInstance(place));
  }

  public async Delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const placeRepository = new PlaceRepository();

    const deletePlaceService = new DeletePlaceService(placeRepository);

    await deletePlaceService.execute(id);

    return response.json({ message: 'Place deleted successfully.' });
  }

  public async Index(request: Request, response: Response): Promise<Response> {
    const placeRepository = new PlaceRepository();

    const listPlaceService = new ListPlaceService(placeRepository);

    const places = await listPlaceService.execute();

    return response.json(instanceToInstance(places));
  }
}
