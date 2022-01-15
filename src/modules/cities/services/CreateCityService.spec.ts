import AppError from '@shared/errors/appError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCityRepository from '../repositories/fakes/FakeCityRepository';
import CreateCityService from './CreateCityService';

let fakeCityRepository: FakeCityRepository;
let fakeStorageProvider: FakeStorageProvider;
let createCityService: CreateCityService;

describe('CreateCity', () => {
  beforeEach(() => {
    fakeCityRepository = new FakeCityRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createCityService = new CreateCityService(
      fakeCityRepository,
      fakeStorageProvider,
    );
  });

  // Deve ser capaz de criar uma nova cidade.
  it('Should be able to create new city.', async () => {
    const city = await createCityService.execute({
      name: 'São Paulo',
      image: 'saopaulo.jpg',
      description: 'são paulo description',
    });

    expect(city).toHaveProperty('id');
  });

  // Não deve ser possível criar uma nova cidade com o mesmo nome de outra.
  it('Should not be able to create a new city with same name another.', async () => {
    await createCityService.execute({
      name: 'São Paulo',
      image: 'saopaulo.jpg',
      description: 'são paulo description',
    });

    await expect(
      createCityService.execute({
        name: 'São Paulo',
        image: 'saopaulo.jpg',
        description: 'são paulo description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
