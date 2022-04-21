import ICityRepository from '@modules/cities/repositories/ICityRepository';
import IPlaceRepository from '@modules/places/repositories/IPlaceRepository';
import AppError from '@shared/errors/appError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import ICreateDepositionDTO from '../dtos/ICreateDepositionDTO';
import Deposition from '../infra/typeorm/entities/Deposition';
import IDepositionRepository from '../repositories/IDepositionRepository';

export default class CreateDepositionService {
  constructor(
    private depositionRepository: IDepositionRepository,
    private storageProvider: IStorageProvider,
    private cityRepository: ICityRepository,
    private placeRepository: IPlaceRepository,
  ) {}

  public async execute({
    name,
    description,
    avatar,
    city_id,
    place_id,
  }: ICreateDepositionDTO): Promise<Deposition> {
    if (!avatar) {
      throw new AppError('Avatar image is required.');
    }

    const city = await this.cityRepository.findById(city_id);

    if (!city) {
      throw new AppError('City is not found.');
    }

    const place = await this.placeRepository.findById(place_id);

    if (!place) {
      throw new AppError('Place is not found.');
    }

    const deposition = await this.depositionRepository.create({
      name,
      description,
      avatar,
      city_id,
      place_id,
    });

    return deposition;
  }
}
