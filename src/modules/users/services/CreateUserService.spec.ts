import AppError from '@shared/errors/appError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUSerService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUSerService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUSerService(fakeUserRepository, fakeHashProvider);
  });

  // Deve ser capaz de criar um novo usuário.
  it('Should be able to create new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });

  // Não deve ser capaz de criar um novo usuário com o mesmo e-mail de outro.
  it('Should not be able to create a new user with same email another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
