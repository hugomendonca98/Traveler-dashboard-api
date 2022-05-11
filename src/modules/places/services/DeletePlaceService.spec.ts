import FakeCityRepository from '@modules/cities/repositories/fakes/FakeCityRepository';
import ICityRepository from '@modules/cities/repositories/ICityRepository';
import AppError from '@shared/errors/appError';
import FakePlaceRepository from '../repositories/fakes/FakePlaceRepository';
import IPlaceRepository from '../repositories/IPlaceRepository';
import DeletePlaceService from './DeletePlaceService';

let fakePlaceRepository: IPlaceRepository;
let fakeCityRepository: ICityRepository;
let deletePlaceService: DeletePlaceService;

describe('DeletePlace', () => {
  beforeEach(() => {
    fakePlaceRepository = new FakePlaceRepository();
    fakeCityRepository = new FakeCityRepository();
    deletePlaceService = new DeletePlaceService(fakePlaceRepository);
  });

  // Deve ser capaz de deletar um local.
  it('Should be able to delete place.', async () => {
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

    await deletePlaceService.execute(place.id);

    const findPlaceDeleted = await fakePlaceRepository.findById(place.id);

    expect(findPlaceDeleted).toEqual(undefined);
  });

  // Não deve ser capaz de deletar usando um id invalido.
  it('Should not be possible to delete a city with a non-existent id.', async () => {
    await expect(
      deletePlaceService.execute('invalid id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
