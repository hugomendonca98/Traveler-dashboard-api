import City from '../infra/typeorm/entities/City';
import ICityRepository from '../repositories/ICityRepository';

export default class ListCityService {
  constructor(private cityRepository: ICityRepository) {}

  public async execute(search: string | undefined): Promise<City[]> {
    if (!search) {
      const cities = await this.cityRepository.findAll();

      return cities;
    }

    const cities = await this.cityRepository.searchByName(search);

    return cities;
  }
}
