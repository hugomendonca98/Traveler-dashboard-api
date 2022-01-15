import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '../entities/User';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }
}
