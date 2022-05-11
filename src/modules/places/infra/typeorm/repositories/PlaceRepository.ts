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
    city_id,
    category_id,
    address_id,
    number_depositions,
    total_depositions_stars,
  }: ICreatePlaceDTO): Promise<Place> {
    const place = this.ormRepository.create({
      name,
      image,
      description,
      number_depositions,
      total_depositions_stars,
      city_id,
      category_id,
      address_id,
    });

    await this.ormRepository.save(place);

    return place;
  }

  public async findAll(): Promise<Place[]> {
    const places = await this.ormRepository.find();

    return places;
  }

  public async showPlace(id: string): Promise<Place | undefined> {
    const place = await this.ormRepository
      .createQueryBuilder('Place')
      .where('Place.id = :id', { id })
      .leftJoinAndSelect(
        'Place.depositions',
        'deposition',
        'deposition.moderation_status = :moderation_status',
        { moderation_status: 'approved' },
      )
      .getOne();

    return place;
  }

  public async findPlaceByCityId(id: string): Promise<Place[]> {
    const teste = await this.ormRepository.find({
      where: { city_id: id },
    });

    return teste;
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
    city_id,
    address_id,
    category_id,
  }: IFindEqualPlaceDTO): Promise<Place | undefined> {
    const place = await this.ormRepository.findOne({
      where: {
        name,
        image,
        description,
        city_id,
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
