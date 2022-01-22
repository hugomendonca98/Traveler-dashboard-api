import ICreatePlaceDTO from '@modules/places/dtos/ICreatePlaceDTO';
import IFindEqualPlaceDTO from '@modules/places/dtos/IFindEqualPlaceDTO';
import Place from '@modules/places/infra/typeorm/entities/Place';
import { v4 as uuid } from 'uuid';
import IPlaceRepository from '../IPlaceRepository';

export default class FakePlaceRepository implements IPlaceRepository {
  private places: Place[] = [];

  public async create(data: ICreatePlaceDTO): Promise<Place> {
    const place = new Place();

    Object.assign(place, { id: uuid() }, data);

    this.places.push(place);

    return place;
  }

  public async findAll(): Promise<Place[]> {
    return this.places;
  }

  public async findById(id: string): Promise<Place | undefined> {
    const place = this.places.find(findPlace => findPlace.id === id);

    return place;
  }

  public async findEqualPlace({
    name,
    image,
    description,
    category_id,
    address_id,
  }: IFindEqualPlaceDTO): Promise<Place | undefined> {
    const findEqualPlace = this.places.find(
      findPlace =>
        findPlace.name === name &&
        findPlace.image === image &&
        findPlace.description === description &&
        findPlace.category_id === category_id &&
        findPlace.address_id === address_id,
    );

    return findEqualPlace;
  }

  public async delete(place: Place): Promise<void> {
    const findIndex = this.places.findIndex(
      findPlace => findPlace.id === place.id,
    );

    this.places.splice(findIndex, 1);
  }

  public async save(place: Place): Promise<Place> {
    const findIndex = this.places.findIndex(
      findPlace => findPlace.id === place.id,
    );

    this.places[findIndex] = place;

    return place;
  }
}
