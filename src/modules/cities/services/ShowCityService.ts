import AppError from '@shared/errors/appError';
import City from '../infra/typeorm/entities/City';
import ICityRepository from '../repositories/ICityRepository';

export default class ShowCityService {
  constructor(private cityRepository: ICityRepository) {}

  public async execute(id: string): Promise<City> {
    const city = await this.cityRepository.findById(id);

    if (!city) {
      throw new AppError('City not exist.', 400);
    }

    return city;
  }
}
