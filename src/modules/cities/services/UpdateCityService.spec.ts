import AppError from '@shared/errors/appError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCityRepository from '../repositories/fakes/FakeCityRepository';
import UpdateCityService from './UpdateCityService';

let fakeCityRepository: FakeCityRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateCityService: UpdateCityService;

describe('UpdateCity', () => {
  beforeEach(() => {
    fakeCityRepository = new FakeCityRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateCityService = new UpdateCityService(
      fakeCityRepository,
      fakeStorageProvider,
    );
  });

  // Deve ser capaz de atualizar uma cidade.
  it('Should be able to update city.', async () => {
    const city = await fakeCityRepository.create({
      name: 'City name',
      image: 'Cityimage.jpg',
      description: 'City description',
    });

    const cityUpdated = await updateCityService.execute({
      id: city.id,
      name: 'City name Updated',
      image: 'Cityimageupdated.jpg',
      description: 'City description updated',
    });

    expect(cityUpdated.id).toBe(city.id);
    expect(cityUpdated.name).toBe('City name Updated');
    expect(cityUpdated.image).toBe('Cityimageupdated.jpg');
    expect(cityUpdated.description).toBe('City description updated');
  });

  // Não deve ser possível atualizar uma cidade com um id inexistente.
  it('Should not be possible to update a city with a non-existent id.', async () => {
    await expect(
      updateCityService.execute({
        id: 'invalid id',
        name: 'City name',
        image: 'City image',
        description: 'City description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser possível atualizar uma cidade com uma imagem inexistente.
  it('Should not be possible to update a city with a non-existent image.', async () => {
    const city = await fakeCityRepository.create({
      name: 'City name',
      image: 'Cityimage.jpg',
      description: 'City description',
    });
    await expect(
      updateCityService.execute({
        id: city.id,
        name: 'City name',
        image: '',
        description: 'City description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
