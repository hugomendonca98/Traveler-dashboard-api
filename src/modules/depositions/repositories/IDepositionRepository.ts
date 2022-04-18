import Deposition from '../infra/typeorm/entities/Deposition';
import ICreateDepositionDTO from '../dtos/ICreateDepositionDTO';

export default interface IDepositionRepository {
  create(data: ICreateDepositionDTO): Promise<Deposition>;
  findById(id: string): Promise<Deposition | undefined>;
  findByName(name: string): Promise<Deposition | undefined>;
}
