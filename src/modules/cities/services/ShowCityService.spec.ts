import AppError from '@shared/errors/appError';
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
  it('Should be able to show city.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São paulo',
      image: 'SaoPaulo.jpg',
      description: 'são paulo description',
    });

    const allCities = await showCityService.execute(city.id);

    expect(allCities).toStrictEqual(city);
  });

  it('Should not be able to show city with non-exist id.', async () => {
    await expect(
      showCityService.execute('non-exist-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
