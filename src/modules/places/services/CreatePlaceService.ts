import IAddressRepository from '@modules/addresses/repositories/IAddressRepository';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import ICityRepository from '@modules/cities/repositories/ICityRepository';
import AppError from '@shared/errors/appError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import ICreatePlaceDTO from '../dtos/ICreatePlaceDTO';
import Place from '../infra/typeorm/entities/Place';
import IPlaceRepository from '../repositories/IPlaceRepository';

export default class CreatePlaceService {
  constructor(
    private placeRepository: IPlaceRepository,
    private storageProvider: IStorageProvider,
    private addressRepository: IAddressRepository,
    private cityRepository: ICityRepository,
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    name,
    image,
    description,
    city_id,
    category_id,
    address_id,
  }: ICreatePlaceDTO): Promise<Place> {
    if (!image) {
      throw new AppError('Place image is requerid.');
    }

    const findCity = await this.cityRepository.findById(city_id);

    if (!findCity) {
      throw new AppError('City is not found.');
    }

    const findCategory = await this.categoryRepository.findById(category_id);

    if (!findCategory) {
      throw new AppError('Category is not found.');
    }

    const findAddress = await this.addressRepository.findById(address_id);

    if (!findAddress) {
      throw new AppError('Address is not found.');
    }

    const findEqualPlace = await this.placeRepository.findEqualPlace({
      name,
      image,
      description,
      city_id,
      category_id,
      address_id,
    });

    if (findEqualPlace) {
      throw new AppError('Place already exist.');
    }

    const fileName = await this.storageProvider.saveFile(image);

    const place = await this.placeRepository.create({
      name,
      image: fileName,
      description,
      number_depositions: 0,
      total_depositions_stars: 0,
      city_id,
      category_id,
      address_id,
    });

    return place;
  }
}
