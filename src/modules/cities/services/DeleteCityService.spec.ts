import AppError from '@shared/errors/appError';
import FakeCityRepository from '../repositories/fakes/FakeCityRepository';
import DeleteCityService from './DeleteCityService';

let fakeCityRepository: FakeCityRepository;
let deleteCityService: DeleteCityService;

describe('DeleteCity', () => {
  beforeEach(() => {
    fakeCityRepository = new FakeCityRepository();
    deleteCityService = new DeleteCityService(fakeCityRepository);
  });

  // Deve ser capaz de excluir uma nova cidade.
  it('Should be able to delete city.', async () => {
    const city = await fakeCityRepository.create({
      name: 'São Paulo',
      image: 'saopaulo.jpg',
      description: 'são paulo description',
    });

    await deleteCityService.execute(city.id);

    const findCityDeleted = await fakeCityRepository.findById(city.id);

    expect(findCityDeleted).toEqual(undefined);
  });

  // Não deve ser possível excluir uma cidade com um id inexistente.
  it('Should not be possible to delete a city with a non-existent id.', async () => {
    await expect(
      deleteCityService.execute('invalid id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
