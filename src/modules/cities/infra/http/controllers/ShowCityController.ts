import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import ShowCityService from '@modules/cities/services/ShowCityService';
import CityRepository from '../../typeorm/repositories/CityRepository';

export default class ShowCityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const cityRepositoy = new CityRepository();

    const showCityService = new ShowCityService(cityRepositoy);

    const city = await showCityService.execute(id);

    return response.json(instanceToInstance(city));
  }
}
