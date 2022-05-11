import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

import ModerationApprovedDepositionService from '@modules/depositions/services/ModerationApprovedDepositionService';
import PlaceRepository from '@modules/places/infra/typeorm/repositories/PlaceRepository';
import DepositionRepository from '../../typeorm/repositories/DepositionRepository';

export default class DepositionModerationController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const depositionRepository = new DepositionRepository();
    const placeRepository = new PlaceRepository();

    const moderationApprovedDepositionService = new ModerationApprovedDepositionService(
      depositionRepository,
      placeRepository,
    );

    const moderation = await moderationApprovedDepositionService.execute({
      depositionId: id,
    });

    return response.json(instanceToInstance(moderation));
  }
}
