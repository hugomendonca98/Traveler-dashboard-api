import { v4 as uuid } from 'uuid';

import Deposition from '@modules/depositions/infra/typeorm/entities/Deposition';
import ICreateDepositionRepositoryDTO from '@modules/depositions/dtos/ICreateDepositionRepositoryDTO';
import IDepositionRepository from '../IDepositionRepository';

export default class FakeDepositionRepository implements IDepositionRepository {
  private depositions: Deposition[] = [];

  public async create(
    data: ICreateDepositionRepositoryDTO,
  ): Promise<Deposition> {
    const deposition = new Deposition();

    Object.assign(deposition, { id: uuid() }, data);

    this.depositions.push(deposition);

    return deposition;
  }

  public async findById(id: string): Promise<Deposition | undefined> {
    const deposition = this.depositions.find(dep => dep.id === id);

    return deposition;
  }

  public async findByName(name: string): Promise<Deposition | undefined> {
    const deposition = this.depositions.find(dep => dep.name === name);

    return deposition;
  }
}
