import AppError from '@shared/errors/appError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import SessionUserService from './SessionUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let sessionUser: SessionUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    sessionUser = new SessionUserService(fakeUserRepository, fakeHashProvider);
  });

  // deve ser capaz de autenticar um usuário.
  it('Should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    });

    const response = await sessionUser.execute({
      email: 'johndoe@example.com',
      password: '12345',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  // Não deve ser capaz de autenticar com um usuário não existente.
  it('Should not be able to authenticate with non existing user', async () => {
    await expect(
      sessionUser.execute({
        email: 'johndoe@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    });

    await expect(
      sessionUser.execute({
        email: 'johndoe@example.com',
        password: 'incorrect_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
