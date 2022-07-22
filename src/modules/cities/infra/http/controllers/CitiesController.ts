import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateCityService from '@modules/cities/services/CreateCityService';
import DeleteCityService from '@modules/cities/services/DeleteCityService';
import ListCityService from '@modules/cities/services/ListCityService';
import UpdateCityService from '@modules/cities/services/UpdateCityService';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import PlaceRepository from '@modules/places/infra/typeorm/repositories/PlaceRepository';
import CreatePlaceService from '@modules/places/services/CreatePlaceService';
import AddressRepository from '@modules/addresses/infra/typeorm/repositories/AddressRepository';
import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import CategoryRepository from '@modules/categories/infra/typeorm/repositories/CategoryRepository';
import S3StorageProvider from '@shared/providers/StorageProvider/implementations/S3StorageProvider';
import CityRepository from '../../typeorm/repositories/CityRepository';

export default class CitiesController {
  public async Create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      localName,
      localDescription,
      categoryId,
      zip_code,
      street,
      neighborhood,
      number,
    } = request.body;

    const files = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const image = files.image[0].filename;
    const localImage = files.localImage[0].filename;

    const cityRepository = new CityRepository();
    const categoryRepository = new CategoryRepository();
    const storageProvider =
      process.env.STORAGE_DRIVER === 's3'
        ? new S3StorageProvider()
        : new DiskStorageProvider();
    const addressRepository = new AddressRepository();
    const placeRepository = new PlaceRepository();
    const createPlaceService = new CreatePlaceService(
      placeRepository,
      storageProvider,
      addressRepository,
      cityRepository,
      categoryRepository,
    );

    const createCityService = new CreateCityService(
      cityRepository,
      storageProvider,
    );

    const createAddressService = new CreateAddressService(addressRepository);

    const address = await createAddressService.execute({
      zip_code,
      street,
      neighborhood,
      number,
    });

    const city = await createCityService.execute({
      name,
      image,
      description,
    });

    await createPlaceService.execute({
      name: localName,
      image: localImage,
      description: localDescription,
      number_depositions: 0,
      total_depositions_stars: 0,
      city_id: city.id,
      category_id: categoryId,
      address_id: address.id,
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
