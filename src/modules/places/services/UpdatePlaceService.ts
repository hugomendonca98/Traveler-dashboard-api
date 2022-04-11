import ICityRepository from '@modules/cities/repositories/ICityRepository';
import AppError from '@shared/errors/appError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import IUpdatePlaceDTO from '../dtos/IUpdatePlaceDTO';
import Place from '../infra/typeorm/entities/Place';
import IPlaceRepository from '../repositories/IPlaceRepository';

export default class UpdatePlaceService {
  constructor(
    private placeRepository: IPlaceRepository,
    private cityRepository: ICityRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    name,
    image,
    description,
    city_id,
    category_id,
    address_id,
  }: IUpdatePlaceDTO): Promise<Place> {
    if (!image) {
      throw new AppError('Place image is requerid.');
    }

    const findPlace = await this.placeRepository.findById(id);

    if (!findPlace) {
      throw new AppError('Location to be updated does not exist.');
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
      throw new AppError('There is already an identical location created.');
    }

    await this.storageProvider.deleteFile(findPlace.image);

    const fileName = await this.storageProvider.saveFile(image);

    Object.assign(findPlace, {
      name,
      image: fileName,
      description,
      city_id,
      category_id,
      address_id,
    });

    const place = await this.placeRepository.save(findPlace);

    return place;
  }
}
