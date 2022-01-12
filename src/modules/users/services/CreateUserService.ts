import AppError from '@shared/errors/appError';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUSerService {
  constructor(
    private userRepository: IUserRepository,
    private hashProivder: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email addres already used.', 409);
    }

    const hashPassword = await this.hashProivder.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}
