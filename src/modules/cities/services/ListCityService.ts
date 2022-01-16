import City from '../infra/typeorm/entities/City';
import ICityRepository from '../repositories/ICityRepository';

export default class ListCityService {
  constructor(private cityRepository: ICityRepository) {}

  public async execute(): Promise<City[]> {
    const cities = await this.cityRepository.findAll();

    return cities;
  }
}
