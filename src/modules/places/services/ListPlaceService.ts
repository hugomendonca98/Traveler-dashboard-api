import Place from '../infra/typeorm/entities/Place';
import IPlaceRepository from '../repositories/IPlaceRepository';

export default class ListPlaceService {
  constructor(private placeRepostory: IPlaceRepository) {}

  public async execute(): Promise<Place[]> {
    const places = await this.placeRepostory.findAll();

    return places;
  }
}
