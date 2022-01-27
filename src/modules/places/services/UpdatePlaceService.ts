import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import IUpdatePlaceDTO from '../dtos/IUpdatePlaceDTO';
import Place from '../infra/typeorm/entities/Place';
import IPlaceRepository from '../repositories/IPlaceRepository';

export default class UpdatePlaceService {
  constructor(
    private placeRepository: IPlaceRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    name,
    image,
    description,
    category_id,
    address_id,
  }: IUpdatePlaceDTO): Promise<Place> {}
}
