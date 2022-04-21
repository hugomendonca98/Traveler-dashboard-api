import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import ICreateDepositionDTO from '../dtos/ICreateDepositionDTO';
import Deposition from '../infra/typeorm/entities/Deposition';
import IDepositionRepository from '../repositories/IDepositionRepository';

export default class CreateDepositionService {
  constructor(
    private depositionRepository: IDepositionRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    description,
    avatar,
    city_id,
    place_id,
  }: ICreateDepositionDTO): Promise<Deposition> {}
}
