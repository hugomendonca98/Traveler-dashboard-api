import AppError from '@shared/errors/appError';
import Place from '../infra/typeorm/entities/Place';
import IPlaceRepository from '../repositories/IPlaceRepository';

export default class ShowPlaceService {
  constructor(private placeRepository: IPlaceRepository) {}

  public async execute(place_id: string): Promise<Place> {
    const place = await this.placeRepository.showPlace(place_id);

    if (!place) {
      throw new AppError('Place is not found.');
    }

    return place;
  }
}
