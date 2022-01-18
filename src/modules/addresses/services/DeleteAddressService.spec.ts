import AppError from '@shared/errors/appError';
import FakeAddressRepository from '../repositories/fakes/FakeCityRepository';
import DeleteAddressService from './DeleteCityService';

let fakeAddressRepository: FakeAddressRepository;
let deleteAddressService: DeleteAddressService;

describe('DeleteAddress', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();
    deleteAddressService = new DeleteAddressService(fakeAddressRepository);
  });

  // Deve ser capaz de excluir um endereço.
  it('Should be able to delete city.', async () => {
    const address = await fakeAddressRepository.create({
      zip_code: '12345678',
      street: 'street jon doe',
      neighborhood: 'neighborhood jon doe',
      number: 123,
    });

    await deleteAddressService.execute(address.id);

    const findAddressDeleted = await fakeAddressRepository.findById(address.id);

    expect(findAddressDeleted).toEqual(undefined);
  });

  // Não deve ser possível excluir um endereço com um id inexistente.
  it('Should not be possible to delete a address with a non-existent id.', async () => {
    await expect(
      deleteAddressService.execute('invalid id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
