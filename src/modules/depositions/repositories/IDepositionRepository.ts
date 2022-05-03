import Deposition from '../infra/typeorm/entities/Deposition';
import ICreateDepositionRepositoryDTO from '../dtos/ICreateDepositionRepositoryDTO';

export default interface IDepositionRepository {
  create(data: ICreateDepositionRepositoryDTO): Promise<Deposition>;
  findById(id: string): Promise<Deposition | undefined>;
  findByName(name: string): Promise<Deposition | undefined>;
  save(deposition: Deposition): Promise<Deposition>;
}
