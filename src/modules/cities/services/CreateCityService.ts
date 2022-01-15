import AppError from '@shared/errors/appError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import ICreateCityDTO from '../dtos/ICreateCityDTO';
import City from '../infra/typeorm/entities/City';
import ICityRepository from '../repositories/ICityRepository';

export default class CreateCityService {
  constructor(
    private cityRepository: ICityRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    image,
    description,
  }: ICreateCityDTO): Promise<City> {
    const findCityName = await this.cityRepository.findByName(name);

    if (findCityName) {
      throw new AppError('City with that name already exists', 409);
    }

    const fileName = await this.storageProvider.saveFile(image);

    const city = await this.cityRepository.create({
      name,
      image: fileName,
      description,
    });

    return city;
  }
}
