import AppError from '@shared/errors/appError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import ICreatePlaceDTO from '../dtos/ICreatePlaceDTO';
import Place from '../infra/typeorm/entities/Place';
import IPlaceRepository from '../repositories/IPlaceRepository';

export default class CreatePlaceService {
  constructor(
    private placeRepository: IPlaceRepository,
    private storageProvider: IStorageProvider,
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
      city_id,
      category_id,
      address_id,
    });

    return place;
  }
}
