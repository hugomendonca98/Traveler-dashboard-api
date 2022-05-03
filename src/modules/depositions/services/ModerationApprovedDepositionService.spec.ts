import FakeAddressRepository from '@modules/addresses/repositories/fakes/FakeCityRepository';
import IAddressRepository from '@modules/addresses/repositories/IAddressRepository';
import FakeCategoryRepository from '@modules/categories/repositories/fakes/FakeCategoryRepository';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import FakeCityRepository from '@modules/cities/repositories/fakes/FakeCityRepository';
import ICityRepository from '@modules/cities/repositories/ICityRepository';
import FakePlaceRepository from '@modules/places/repositories/fakes/FakePlaceRepository';
import IPlaceRepository from '@modules/places/repositories/IPlaceRepository';
import AppError from '@shared/errors/appError';
import FakeDepositionRepository from '../repositories/fakes/FakeDepositionRepository';
import IDepositionRepository from '../repositories/IDepositionRepository';
import ModerationApprovedDepositionService from './ModerationApprovedDepositionService';

let fakeDepositionRepository: IDepositionRepository;
let fakePlaceRepository: IPlaceRepository;
let fakeCityRepository: ICityRepository;
let fakeAddressRepository: IAddressRepository;
let fakeCategoryRepository: ICategoryRepository;
let moderationDeposition: ModerationApprovedDepositionService;

// Deve ser capaz de aprovar um depoimento.
describe('ModerationApprovedDepositionService', () => {
  beforeEach(() => {
    fakeDepositionRepository = new FakeDepositionRepository();
    fakePlaceRepository = new FakePlaceRepository();
    fakeCityRepository = new FakeCityRepository();
    fakeAddressRepository = new FakeAddressRepository();
    fakeCategoryRepository = new FakeCategoryRepository();
    moderationDeposition = new ModerationApprovedDepositionService(
      fakeDepositionRepository,
      fakePlaceRepository,
    );
  });

  it('Should be able to approve deposition', async () => {
    const city = await fakeCityRepository.create({
      name: 'City name',
      description: 'City Description',
      image: 'city.png',
    });

    const address = await fakeAddressRepository.create({
      street: 'Street name',
      number: 316,
      neighborhood: 'Jhon Doe',
      zip_code: '1234455',
    });

    const category = await fakeCategoryRepository.create({
      name: 'Category name',
      icon: 'icon.png',
    });

    const place = await fakePlaceRepository.create({
      name: 'Place name',
      description: 'Place description',
      image: 'place.png',
      number_depositions: 0,
      total_depositions_stars: 2,
      city_id: city.id,
      address_id: address.id,
      category_id: category.id,
    });

    const deposition = await fakeDepositionRepository.create({
      name: 'Deposition name',
      description: 'Deposition description',
      avatar: 'avatar.png',
      moderation_status: 'waiting',
      stars: 4,
      city_id: city.id,
      place_id: place.id,
    });

    const moderation_approved = await moderationDeposition.execute({
      placeId: place.id,
      depositionId: deposition.id,
    });

    const findDeposition = await fakeDepositionRepository.findById(
      deposition.id,
    );

    expect(findDeposition?.moderation_status).toEqual('approved');
    expect(findDeposition).toHaveProperty('id');
    expect(findDeposition?.stars).toEqual(4);
    expect(moderation_approved.number_depositions).toEqual(1);
    expect(moderation_approved.total_depositions_stars).toEqual(6);
  });

  // Não deve ser capaz de aprovar um depoimento com um local inexistente.
  it('Should not be able to approve a deposition in a non-existent location', async () => {
    const city = await fakeCityRepository.create({
      name: 'City name',
      description: 'City Description',
      image: 'city.png',
    });

    const address = await fakeAddressRepository.create({
      street: 'Street name',
      number: 316,
      neighborhood: 'Jhon Doe',
      zip_code: '1234455',
    });

    const category = await fakeCategoryRepository.create({
      name: 'Category name',
      icon: 'icon.png',
    });

    const place = await fakePlaceRepository.create({
      name: 'Place name',
      description: 'Place description',
      image: 'place.png',
      number_depositions: 0,
      total_depositions_stars: 2,
      city_id: city.id,
      address_id: address.id,
      category_id: category.id,
    });

    const deposition = await fakeDepositionRepository.create({
      name: 'Deposition name',
      description: 'Deposition description',
      avatar: 'avatar.png',
      moderation_status: 'waiting',
      stars: 4,
      city_id: city.id,
      place_id: place.id,
    });

    await expect(
      moderationDeposition.execute({
        placeId: 'inexist place',
        depositionId: deposition.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não deve ser capaz de aprovar um depoimento com id inexistente.
  it('Should not be able to approve a deposition in a non-existent deposition', async () => {
    const city = await fakeCityRepository.create({
      name: 'City name',
      description: 'City Description',
      image: 'city.png',
    });

    const address = await fakeAddressRepository.create({
      street: 'Street name',
      number: 316,
      neighborhood: 'Jhon Doe',
      zip_code: '1234455',
    });

    const category = await fakeCategoryRepository.create({
      name: 'Category name',
      icon: 'icon.png',
    });

    const place = await fakePlaceRepository.create({
      name: 'Place name',
      description: 'Place description',
      image: 'place.png',
      number_depositions: 0,
      total_depositions_stars: 2,
      city_id: city.id,
      address_id: address.id,
      category_id: category.id,
    });

    await expect(
      moderationDeposition.execute({
        placeId: place.id,
        depositionId: 'inexist deposition',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
