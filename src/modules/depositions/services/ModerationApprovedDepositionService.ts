import Place from '@modules/places/infra/typeorm/entities/Place';
import IPlaceRepository from '@modules/places/repositories/IPlaceRepository';
import AppError from '@shared/errors/appError';
import IModerationDepositionDTO from '../dtos/ModerationApprovedDepositionDTO';
import IDepositionRepository from '../repositories/IDepositionRepository';

export default class ModerationApprovedDepositionService {
  constructor(
    private depositionRepository: IDepositionRepository,
    private placeRepository: IPlaceRepository,
  ) {}

  public async execute({
    placeId,
    depositionId,
  }: IModerationDepositionDTO): Promise<Place> {
    const place = await this.placeRepository.findById(placeId);

    if (!place) {
      throw new AppError('Place to be commented does not exist');
    }

    const deposition = await this.depositionRepository.findById(depositionId);

    if (!deposition) {
      throw new AppError('Deposition not found.');
    }

    const depositionApproved = Object.assign(deposition, {
      moderation_status: 'approved',
    });

    await this.depositionRepository.save(depositionApproved);

    const placeUpdated = Object.assign(place, {
      number_depositions: place.number_depositions + 1,
      total_depositions_stars: place.total_depositions_stars + deposition.stars,
    });

    await this.placeRepository.save(placeUpdated);

    return placeUpdated;
  }
}
