import FakeCityRepository from '../repositories/fakes/FakeCityRepository';
import ListCityService from './ListCityService';

let fakeCityRepository: FakeCityRepository;
let listCityService: ListCityService;

describe('ListCities', () => {
  beforeEach(() => {
    fakeCityRepository = new FakeCityRepository();
    listCityService = new ListCityService(fakeCityRepository);
  });

  // Deve listar todas as cidades cadastradas.
  it('Should be able to list all cities.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      image: 'SaoPaulo.jpg',
      description: 'são paulo description',
    });

    const city2 = await fakeCityRepository.create({
      name: 'Maceio',
      image: 'Maceio.jpg',
      description: 'Maceio description',
    });

    const allCities = await listCityService.execute();

    expect(allCities).toStrictEqual([city, city2]);
  });
});
