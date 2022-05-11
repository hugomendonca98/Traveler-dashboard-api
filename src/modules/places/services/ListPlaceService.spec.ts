import FakeCityRepository from '@modules/cities/repositories/fakes/FakeCityRepository';
import ICityRepository from '@modules/cities/repositories/ICityRepository';
import FakePlaceRepository from '../repositories/fakes/FakePlaceRepository';
import IPlaceRepository from '../repositories/IPlaceRepository';
import ListPlaceService from './ListPlaceService';

let fakePlaceRepository: IPlaceRepository;
let fakeCityRepository: ICityRepository;
let listPlaceService: ListPlaceService;

describe('ListPlace', () => {
  beforeEach(() => {
    fakePlaceRepository = new FakePlaceRepository();
    fakeCityRepository = new FakeCityRepository();
    listPlaceService = new ListPlaceService(fakePlaceRepository);
  });

  // Deve ser capaz de listar todos os locais cadastrados.
  it('Should be able to list all places.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      description: 'example description',
      image: 'sp.png',
    });

    const place = await fakePlaceRepository.create({
      name: 'São Paulo',
      image: 'SãoPaulo.jpg',
      description: 'São Paulo description',
      number_depositions: 0,
      total_depositions_stars: 0,
      city_id: city.id,
      category_id: '1234',
      address_id: '12345',
    });

    const place2 = await fakePlaceRepository.create({
      name: 'Maceio',
      image: 'Maceio.jpg',
      description: 'Maceio description',
      number_depositions: 0,
      total_depositions_stars: 0,
      city_id: city.id,
      category_id: '12345',
      address_id: '123456',
    });

    const allPlaces = await listPlaceService.execute();

    expect(allPlaces).toStrictEqual([place, place2]);
  });
});
