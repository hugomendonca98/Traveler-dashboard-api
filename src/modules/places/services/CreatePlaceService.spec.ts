import FakeCityRepository from '@modules/cities/repositories/fakes/FakeCityRepository';
import ICityRepository from '@modules/cities/repositories/ICityRepository';
import AppError from '@shared/errors/appError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import FakePlaceRepository from '../repositories/fakes/FakePlaceRepository';
import IPlaceRepository from '../repositories/IPlaceRepository';
import CreatePlaceService from './CreatePlaceService';

let fakePlaceRepository: IPlaceRepository;
let fakeStorageProvider: IStorageProvider;
let fakeCityRepository: ICityRepository;
let createPlaceService: CreatePlaceService;

describe('CreatePlace', () => {
  beforeEach(() => {
    fakePlaceRepository = new FakePlaceRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeCityRepository = new FakeCityRepository();
    createPlaceService = new CreatePlaceService(
      fakePlaceRepository,
      fakeStorageProvider,
    );
  });

  // Deve ser capaz de criar um novo local.
  it('Should be able to create new place', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      description: 'example description',
      image: 'sp.png',
    });

    const place = await createPlaceService.execute({
      name: 'São paulo',
      image: 'saopaulo.jpg',
      description: 'São Paulo description',
      number_depositions: 0,
      total_depositions_stars: 0,
      city_id: city.id,
      category_id: '12345',
      address_id: '12345',
    });

    expect(place).toHaveProperty('id');
  });

  // Não deve ser capaz de criar um local sem imagem.
  it('Should not be able to create a place without an image.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      description: 'example description',
      image: 'sp.png',
    });

    await expect(
      createPlaceService.execute({
        name: 'São paulo',
        image: undefined,
        description: 'São Paulo description',
        number_depositions: 0,
        total_depositions_stars: 0,
        city_id: city.id,
        category_id: '12345',
        address_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser capaz de criar um novo local indentico a um existente.
  it('Should not be able to create a new place with same equal another.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      description: 'example description',
      image: 'sp.png',
    });

    await fakePlaceRepository.create({
      name: 'São paulo',
      image: 'saopaulo.jpg',
      description: 'São Paulo description',
      number_depositions: 0,
      total_depositions_stars: 0,
      city_id: city.id,
      category_id: '12345',
      address_id: '12345',
    });

    await expect(
      createPlaceService.execute({
        name: 'São paulo',
        image: 'saopaulo.jpg',
        description: 'São Paulo description',
        number_depositions: 0,
        total_depositions_stars: 0,
        city_id: city.id,
        category_id: '12345',
        address_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
