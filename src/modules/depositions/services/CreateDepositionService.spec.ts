import FakeCityRepository from '@modules/cities/repositories/fakes/FakeCityRepository';
import ICityRepository from '@modules/cities/repositories/ICityRepository';
import FakePlaceRepository from '@modules/places/repositories/fakes/FakePlaceRepository';
import IPlaceRepository from '@modules/places/repositories/IPlaceRepository';
import AppError from '@shared/errors/appError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import FakeDepositionRepository from '../repositories/fakes/FakeDepositionRepository';
import IDepositionRepository from '../repositories/IDepositionRepository';
import CreateDepositionService from './CreateDepositionService';

let fakeDepositionRepository: IDepositionRepository;
let fakeStorageProvider: IStorageProvider;
let fakeCityRepository: ICityRepository;
let fakePlaceRepository: IPlaceRepository;
let createDepositionService: CreateDepositionService;

describe('CreteDeposition', () => {
  beforeEach(() => {
    fakeDepositionRepository = new FakeDepositionRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeCityRepository = new FakeCityRepository();
    fakePlaceRepository = new FakePlaceRepository();
    createDepositionService = new CreateDepositionService(
      fakeDepositionRepository,
      fakeStorageProvider,
    );
  });

  // Deve ser capaz de criar um novo depoimento.
  it('Should be able to create deposition.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      description: 'example description',
      image: 'sp.png',
    });

    const place = await fakePlaceRepository.create({
      name: 'place name',
      image: 'place.png',
      city_id: city.id,
      address_id: 'address',
      category_id: 'category',
      description: 'place description',
    });

    const deposition = await createDepositionService.execute({
      name: 'Hugo Mendonça',
      avatar: 'example.png',
      description: 'example description',
      city_id: city.id,
      place_id: place.id,
    });

    expect(deposition).toHaveProperty('id');
    expect(deposition.name).toEqual('Hugo Mendonça');
    expect(deposition.avatar).toEqual('example.png');
    expect(deposition.description).toEqual('example description');
    expect(deposition.city_id).toEqual(city.id);
    expect(deposition.place.id).toEqual(place.id);
    expect(deposition).toEqual(deposition);
  });

  // Não deve ser capaz de criar um novo depoimento caso a cidade não exista.
  it('Should not be able to create deposition with non existing city', async () => {
    const place = await fakePlaceRepository.create({
      name: 'place name',
      image: 'place.png',
      city_id: 'city id',
      address_id: 'address',
      category_id: 'category',
      description: 'place description',
    });

    expect(
      await createDepositionService.execute({
        name: 'Hugo Mendonça',
        avatar: 'example.png',
        description: 'example description',
        city_id: 'non existing id',
        place_id: place.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser capaz de criar um depoimento caso o local não exista.
  it('Should not be able to create deposition with non existing place', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      description: 'example description',
      image: 'sp.png',
    });

    expect(
      await createDepositionService.execute({
        name: 'Hugo Mendonça',
        avatar: 'example.png',
        description: 'example description',
        city_id: city.id,
        place_id: 'non existing id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser capaz de criar um depoimento sem uma imagem de perfil definida.
  it('Should not be able to create a new testimonial without an avatar image', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      description: 'example description',
      image: 'sp.png',
    });

    const place = await fakePlaceRepository.create({
      name: 'place name',
      image: 'place.png',
      city_id: city.id,
      address_id: 'address',
      category_id: 'category',
      description: 'place description',
    });

    expect(
      await createDepositionService.execute({
        name: 'Hugo Mendonça',
        avatar: undefined,
        description: 'example description',
        city_id: city.id,
        place_id: place.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
