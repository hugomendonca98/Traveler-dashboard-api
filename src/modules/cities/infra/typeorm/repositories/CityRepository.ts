import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import ICityRepository from '@modules/cities/repositories/ICityRepository';
import { getRepository, Repository } from 'typeorm';
import City from '../entities/City';

export default class CityRepository implements ICityRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  public async create({
    name,
    image,
    description,
  }: ICreateCityDTO): Promise<City> {
    const city = this.ormRepository.create({
      name,
      image,
      description,
    });

    await this.ormRepository.save(city);

    return city;
  }

  public async findAll(): Promise<City[]> {
    const cities = await this.ormRepository.find();

    return cities;
  }

  public async findById(id: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne({
      where: { id },
    });

    return city;
  }

  public async findByName(name: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne({
      where: { name },
    });

    return city;
  }

  public async delete(city: City): Promise<void> {
    await this.ormRepository.remove(city);
  }

  public async save(city: City): Promise<City> {
    const citySaved = await this.ormRepository.save(city);

    return citySaved;
  }
}
