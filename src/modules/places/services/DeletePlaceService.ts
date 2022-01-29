import AppError from '@shared/errors/appError';
import IPlaceRepository from '../repositories/IPlaceRepository';

export default class DeletePlaceService {
  constructor(private placeRepository: IPlaceRepository) {}

  public async execute(id: string): Promise<void> {
    const findPlace = await this.placeRepository.findById(id);

    if (!findPlace) {
      throw new AppError('The place does not exist.');
    }

    await this.placeRepository.delete(findPlace);
  }
}
