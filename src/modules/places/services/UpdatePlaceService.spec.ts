import AppError from '@shared/errors/appError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import FakePlaceRepository from '../repositories/fakes/FakePlaceRepository';
import UpdatePlaceService from './UpdatePlaceService';

let fakePlaceRepository: FakePlaceRepository;
let fakeStorageProvider: FakeStorageProvider;
let updatePlaceService: UpdatePlaceService;

describe('UpdatePlace', () => {
  beforeEach(() => {
    fakePlaceRepository = new FakePlaceRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updatePlaceService = new UpdatePlaceService(
      fakePlaceRepository,
      fakeStorageProvider,
    );
  });

  // Deve ser capaz de criar um novo local.
  it('Should be able to update place.', async () => {
    const place = await fakePlaceRepository.create({
      name: 'São Paulo',
      image: 'SãoPaulo.jpg',
      description: 'São Paulo description',
      category_id: '1234',
      address_id: '12345',
    });

    const placeUpdated = await updatePlaceService.execute({
      id: place.id,
      name: 'São Paulo updated',
      image: 'SãoPauloUpdated.jpg',
      description: 'São Paulo description updated',
      category_id: '4321',
      address_id: '54321',
    });

    expect(placeUpdated.id).toBe(place.id);
    expect(placeUpdated.name).toBe('São Paulo updated');
    expect(placeUpdated.image).toBe('SãoPauloUpdated.jpg');
    expect(placeUpdated.description).toBe('São Paulo description updated');
    expect(placeUpdated.category_id).toBe('4321');
    expect(placeUpdated.address_id).toBe('54321');
  });

  // Não deve ser possível atualizar um local com um id inexistente.
  it('Should not be possible to update a place with a non-existent id.', async () => {
    await expect(
      updatePlaceService.execute({
        id: 'invalid id',
        name: 'São Paulo updated',
        image: 'SãoPauloUpdated.jpg',
        description: 'São Paulo description updated',
        category_id: '4321',
        address_id: '54321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser possível atualizar um local com uma imagem inexistente.
  it('Should not be possible to update a place with a non-existent image.', async () => {
    const place = await fakePlaceRepository.create({
      name: 'São Paulo',
      image: 'SãoPaulo.jpg',
      description: 'São Paulo description',
      category_id: '1234',
      address_id: '12345',
    });

    await expect(
      updatePlaceService.execute({
        id: place.id,
        name: 'São Paulo updated',
        image: undefined,
        description: 'São Paulo description updated',
        category_id: '4321',
        address_id: '54321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
