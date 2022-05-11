import FakeCityRepository from '@modules/cities/repositories/fakes/FakeCityRepository';
import ICityRepository from '@modules/cities/repositories/ICityRepository';
import AppError from '@shared/errors/appError';
import FakePlaceRepository from '../repositories/fakes/FakePlaceRepository';
import IPlaceRepository from '../repositories/IPlaceRepository';
import ShowPlaceService from './ShowPlaceService';

let fakePlaceRepository: IPlaceRepository;
let fakeCityRepository: ICityRepository;
let showPlaceService: ShowPlaceService;

describe('ShowPlace', () => {
  beforeEach(() => {
    fakePlaceRepository = new FakePlaceRepository();
    fakeCityRepository = new FakeCityRepository();
    showPlaceService = new ShowPlaceService(fakePlaceRepository);
  });

  // Deve ser capaz de mostrar os detalhes de uma cidade.
  it('Should be able to show place.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      description: 'example description',
      image: 'sp.png',
    });

    const place = await fakePlaceRepository.create({
      name: 'São paulo',
      image: 'saopaulo.jpg',
      description: 'São Paulo description',
      number_depositions: 0,
      total_depositions_stars: 0,
      city_id: city.id,
      category_id: '12345',
      address_id: '12345',
    });

    const showPlace = await showPlaceService.execute(place.id);

    expect(showPlace.id).toEqual(place.id);
    expect(showPlace.city_id).toEqual(city.id);
  });

  // Não deve ser capaz de mostar um local com id inexistente.
  it('Should not be able to show place with non-existing id', async () => {
    await expect(
      showPlaceService.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
