import FakePlaceRepository from '../repositories/fakes/FakePlaceRepository';
import ListPlaceService from './ListPlaceService';

let fakePlaceRepository: FakePlaceRepository;
let listPlaceService: ListPlaceService;

describe('ListPlace', () => {
  beforeEach(() => {
    fakePlaceRepository = new FakePlaceRepository();
    listPlaceService = new ListPlaceService(fakePlaceRepository);
  });

  // Deve ser capaz de listar todos os locais cadastrados.
  it('Should be able to list all places.', async () => {
    const place = await fakePlaceRepository.create({
      name: 'São Paulo',
      image: 'SãoPaulo.jpg',
      description: 'São Paulo description',
      category_id: '1234',
      address_id: '12345',
    });

    const place2 = await fakePlaceRepository.create({
      name: 'Maceio',
      image: 'Maceio.jpg',
      description: 'Maceio description',
      category_id: '12345',
      address_id: '123456',
    });

    const allPlaces = await listPlaceService.execute();

    expect(allPlaces).toStrictEqual([place, place2]);
  });
});
