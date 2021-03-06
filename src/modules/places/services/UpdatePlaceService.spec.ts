import FakeCityRepository from '@modules/cities/repositories/fakes/FakeCityRepository';
import ICityRepository from '@modules/cities/repositories/ICityRepository';
import AppError from '@shared/errors/appError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import FakePlaceRepository from '../repositories/fakes/FakePlaceRepository';
import IPlaceRepository from '../repositories/IPlaceRepository';
import UpdatePlaceService from './UpdatePlaceService';

let fakePlaceRepository: IPlaceRepository;
let fakeCityRepository: ICityRepository;
let fakeStorageProvider: IStorageProvider;
let updatePlaceService: UpdatePlaceService;

describe('UpdatePlace', () => {
  beforeEach(() => {
    fakePlaceRepository = new FakePlaceRepository();
    fakeCityRepository = new FakeCityRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updatePlaceService = new UpdatePlaceService(
      fakePlaceRepository,
      fakeCityRepository,
      fakeStorageProvider,
    );
  });

  // Deve ser capaz de atualizar um novo local.
  it('Should be able to update place.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São Paulo',
      image: 'saopaulo.jpg',
      description: 'são paulo description',
    });

    const place = await fakePlaceRepository.create({
      name: 'São Paulo',
      image: 'SãoPaulo.jpg',
      description: 'São Paulo description',
      number_depositions: 0,
      total_depositions_stars: 0,
      category_id: '1234',
      address_id: '12345',
      city_id: city.id,
    });

    const placeUpdated = await updatePlaceService.execute({
      id: place.id,
      name: 'São Paulo updated',
      image: 'SãoPauloUpdated.jpg',
      description: 'São Paulo description updated',
      category_id: '4321',
      address_id: '54321',
      city_id: city.id,
    });

    expect(placeUpdated.id).toBe(place.id);
    expect(placeUpdated.name).toBe('São Paulo updated');
    expect(placeUpdated.image).toBe('SãoPauloUpdated.jpg');
    expect(placeUpdated.description).toBe('São Paulo description updated');
    expect(placeUpdated.category_id).toBe('4321');
    expect(placeUpdated.address_id).toBe('54321');
    expect(placeUpdated.city_id).toBe(city.id);
  });

  // Não deve ser possível atualizar um local com um id inexistente.
  it('Should not be possible to update a place with a non-existent id.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São Paulo',
      image: 'saopaulo.jpg',
      description: 'são paulo description',
    });

    await expect(
      updatePlaceService.execute({
        id: 'invalid id',
        name: 'São Paulo updated',
        image: 'SãoPauloUpdated.jpg',
        description: 'São Paulo description updated',
        category_id: '4321',
        address_id: '54321',
        city_id: city.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser possível atualizar um local com uma cidade inexistente.
  it('Should not be possible to update a place with a non-existent id.', async () => {
    await expect(
      updatePlaceService.execute({
        id: 'invalid id',
        name: 'São Paulo updated',
        image: 'SãoPauloUpdated.jpg',
        description: 'São Paulo description updated',
        category_id: '4321',
        address_id: '54321',
        city_id: 'inexist city',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser possível atualizar um local com uma imagem inexistente.
  it('Should not be possible to update a place with a non-existent image.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São Paulo',
      image: 'saopaulo.jpg',
      description: 'são paulo description',
    });

    const place = await fakePlaceRepository.create({
      name: 'São Paulo',
      image: 'SãoPaulo.jpg',
      description: 'São Paulo description',
      number_depositions: 0,
      total_depositions_stars: 0,
      category_id: '1234',
      address_id: '12345',
      city_id: city.id,
    });

    await expect(
      updatePlaceService.execute({
        id: place.id,
        name: 'São Paulo updated',
        image: undefined,
        description: 'São Paulo description updated',
        category_id: '4321',
        address_id: '54321',
        city_id: city.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser capaz de atualizar um local para um local já existente.
  it('Should not possible to update one location with all information identical to another.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São Paulo',
      image: 'saopaulo.jpg',
      description: 'são paulo description',
    });

    const place = await fakePlaceRepository.create({
      name: 'São Paulo',
      image: 'SãoPaulo.jpg',
      description: 'São Paulo description',
      number_depositions: 0,
      total_depositions_stars: 0,
      category_id: '1234',
      address_id: '12345',
      city_id: city.id,
    });

    await expect(
      updatePlaceService.execute({
        id: place.id,
        name: 'São Paulo',
        image: 'SãoPaulo.jpg',
        description: 'São Paulo description',
        category_id: '1234',
        address_id: '12345',
        city_id: city.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
