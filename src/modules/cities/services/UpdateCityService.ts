import AppError from '@shared/errors/appError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import IUpdateCityServiceDTO from '../dtos/IUpdateCityDTO';
import City from '../infra/typeorm/entities/City';
import ICityRepository from '../repositories/ICityRepository';

export default class UpdateCityService {
  constructor(
    private cityRepository: ICityRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    name,
    image,
    description,
  }: IUpdateCityServiceDTO): Promise<City> {
    if (!image) {
      throw new AppError('The city image is requerid.');
    }

    const findCity = await this.cityRepository.findById(id);

    if (!findCity) {
      throw new AppError('The city does not exist.');
    }

    await this.storageProvider.deleteFile(findCity.image);

    const fileName = await this.storageProvider.saveFile(image);

    Object.assign(findCity, { name, image: fileName, description });

    const city = await this.cityRepository.save(findCity);

    return city;
  }
}
