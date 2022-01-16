import AppError from '@shared/errors/appError';
import ICityRepository from '../repositories/ICityRepository';

export default class DeleteCityService {
  constructor(private cityRepository: ICityRepository) {}

  public async execute(id: string): Promise<void> {
    const findCity = await this.cityRepository.findById(id);

    if (!findCity) {
      throw new AppError('the city does not exist.');
    }

    await this.cityRepository.delete(findCity);
  }
}
