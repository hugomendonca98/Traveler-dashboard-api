import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import ShowPlaceService from '@modules/places/services/ShowPlaceService';
import PlaceRepository from '../../typeorm/repositories/PlaceRepository';

export default class PlaceController {
  public async Index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const placeRepository = new PlaceRepository();

    const showPlaceService = new ShowPlaceService(placeRepository);

    const place = await showPlaceService.execute(id);

    return response.json(instanceToInstance(place));
  }
}
