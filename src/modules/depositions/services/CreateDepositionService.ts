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
    stars,
    avatar,
    place_id,
  }: ICreateDepositionDTO): Promise<Deposition> {
    if (stars > 5 || stars < 1) {
      throw new AppError('Must set from 1 to 5 stars in your review.');
    }

    if (!avatar) {
      throw new AppError('Avatar image is required.');
    }

    const place = await this.placeRepository.findById(place_id);

    if (!place) {
      throw new AppError('Place is not found.');
    }

    const city = await this.cityRepository.findById(place.city_id);

    if (!city) {
      throw new AppError('City is not found.');
    }

    const deposition = await this.depositionRepository.create({
      name,
      description,
      stars,
      avatar,
      city_id: city.id,
      place_id,
    });

    return deposition;
  }
}
