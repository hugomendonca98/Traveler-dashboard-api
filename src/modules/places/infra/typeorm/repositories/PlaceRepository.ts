import { getRepository, Repository } from 'typeorm';

import ICreatePlaceDTO from '@modules/places/dtos/ICreatePlaceDTO';
import IFindEqualPlaceDTO from '@modules/places/dtos/IFindEqualPlaceDTO';
import IPlaceRepository from '@modules/places/repositories/IPlaceRepository';
import Place from '../entities/Place';

export default class PlaceRepository implements IPlaceRepository {
  private ormRepository: Repository<Place>;

  constructor() {
    this.ormRepository = getRepository(Place);
  }

  public async create({
    name,
    image,
    description,
    category_id,
    address_id,
  }: ICreatePlaceDTO): Promise<Place> {
    const place = this.ormRepository.create({
      name,
      image,
      description,
      category_id,
      address_id,
    });

    await this.ormRepository.save(place);

    return place;
  }

  public async findAll(): Promise<Place[]> {
    const findPlaces = await this.ormRepository.find();

    return findPlaces;
  }

  public async findById(id: string): Promise<Place | undefined> {
    const place = await this.ormRepository.findOne({
      where: { id },
    });

    return place;
  }

  public async findEqualPlace({
    name,
    image,
    description,
    address_id,
    category_id,
  }: IFindEqualPlaceDTO): Promise<Place | undefined> {
    const place = await this.ormRepository.findOne({
      where: {
        name,
        image,
        description,
        address_id,
        category_id,
      },
    });

    return place;
  }

  public async delete(place: Place): Promise<void> {
    this.ormRepository.remove(place);
  }

  public async save(place: Place): Promise<Place> {
    const placeSaved = await this.ormRepository.save(place);

    return placeSaved;
  }
}
