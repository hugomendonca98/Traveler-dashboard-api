import FakeCityRepository from '../repositories/fakes/FakeCityRepository';
import ShowCityService from './ShowCityService';

let fakeCityRepository: FakeCityRepository;
let showCityService: ShowCityService;

describe('ShowCity', () => {
  beforeEach(() => {
    fakeCityRepository = new FakeCityRepository();
    showCityService = new ShowCityService(fakeCityRepository);
  });

  // Deve mostrar a cidade solicitada.
  it('Should be able to list all cities.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      image: 'SaoPaulo.jpg',
      description: 'são paulo description',
    });

    const allCities = await showCityService.execute(city.id);

    expect(allCities).toStrictEqual(city);
  });
});
