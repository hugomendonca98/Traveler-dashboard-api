import AppError from '@shared/errors/appError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import FakePlaceRepository from '../repositories/fakes/FakePlaceRepository';
import CreatePlaceService from './CreatePlaceService';

let fakePlaceRepository: FakePlaceRepository;
let fakeStorageProvider: FakeStorageProvider;
let createPlaceService: CreatePlaceService;

describe('CreatePlace', () => {
  beforeEach(() => {
    fakePlaceRepository = new FakePlaceRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createPlaceService = new CreatePlaceService(
      fakePlaceRepository,
      fakeStorageProvider,
    );
  });

  // Deve ser capaz de criar um novo local.
  it('Should be able to create new place', async () => {
    const place = await createPlaceService.execute({
      name: 'São paulo',
      image: 'saopaulo.jpg',
      description: 'São Paulo description',
      category_id: '12345',
      address_id: '12345',
    });

    expect(place).toHaveProperty('id');
  });

  // Não deve ser capaz de criar um local sem imagem.
  it('Should not be able to create a place without an image.', async () => {
    await expect(
      createPlaceService.execute({
        name: 'São paulo',
        image: undefined,
        description: 'São Paulo description',
        category_id: '12345',
        address_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser capaz de criar um novo local indentico a um existente.
  it('Should not be able to create a new place with same equal another.', async () => {
    await fakePlaceRepository.create({
      name: 'São paulo',
      image: 'saopaulo.jpg',
      description: 'São Paulo description',
      category_id: '12345',
      address_id: '12345',
    });

    await expect(
      createPlaceService.execute({
        name: 'São paulo',
        image: 'saopaulo.jpg',
        description: 'São Paulo description',
        category_id: '12345',
        address_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
