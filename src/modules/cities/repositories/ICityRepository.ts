import ICreateCityDTO from '../dtos/ICreateCityDTO';
import City from '../infra/typeorm/entities/City';

export default interface ICityRepository {
  create(data: ICreateCityDTO): Promise<City>;
  findById(id: string): Promise<City | undefined>;
  findByName(name: string): Promise<City | undefined>;
  findAll(): Promise<City[]>;
  delete(id: string): Promise<void>;
  save(city: City): Promise<City>;
}
