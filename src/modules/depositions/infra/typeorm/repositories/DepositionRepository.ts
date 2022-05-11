import ICreateDepositionRepositoryDTO from '@modules/depositions/dtos/ICreateDepositionRepositoryDTO';
import IDepositionRepository from '@modules/depositions/repositories/IDepositionRepository';
import { getRepository, Repository } from 'typeorm';
import Deposition from '../entities/Deposition';

export default class DepositionRepository implements IDepositionRepository {
  private ormRepository: Repository<Deposition>;

  constructor() {
    this.ormRepository = getRepository(Deposition);
  }

  public async create({
    name,
    description,
    avatar,
    stars,
    city_id,
    place_id,
    moderation_status,
  }: ICreateDepositionRepositoryDTO): Promise<Deposition> {
    const deposition = this.ormRepository.create({
      name,
      description,
      avatar,
      stars,
      moderation_status,
      city_id,
      place_id,
    });

    await this.ormRepository.save(deposition);

    return deposition;
  }

  public async save(deposition: Deposition): Promise<Deposition> {
    const depositionSaved = await this.ormRepository.save(deposition);

    return depositionSaved;
  }

  public async findById(id: string): Promise<Deposition | undefined> {
    const deposition = await this.ormRepository.findOne({
      where: { id },
    });

    return deposition;
  }

  public async findByName(name: string): Promise<Deposition | undefined> {
    const deposition = await this.ormRepository.findOne({
      where: { name },
    });

    return deposition;
  }
}
