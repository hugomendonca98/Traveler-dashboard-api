import { v4 as uuid } from 'uuid';

import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import City from '@modules/cities/infra/typeorm/entities/City';
import ICityRepository from '../ICityRepository';

export default class FakeCityRepository implements ICityRepository {
  private cities: City[] = [];

  public async create(data: ICreateCityDTO): Promise<City> {
    const city = new City();

    Object.assign(city, { id: uuid() }, data);

    this.cities.push(city);

    return city;
  }

  public async findById(id: string): Promise<City | undefined> {
    const city = this.cities.find(findCity => findCity.id === id);

    return city;
  }

  public async findByName(name: string): Promise<City | undefined> {
    const city = this.cities.find(findName => findName.name === name);

    return city;
  }

  public async findAll(): Promise<City[]> {
    return this.cities;
  }

  public async delete(city: City): Promise<void> {
    const cityIndex = this.cities.findIndex(
      findCity => findCity.id === city.id,
    );

    this.cities.splice(cityIndex, 1);
  }

  public async save(city: City): Promise<City> {
    const findIndex = this.cities.findIndex(
      findCity => findCity.id === city.id,
    );

    this.cities[findIndex] = city;

    return city;
  }
}
