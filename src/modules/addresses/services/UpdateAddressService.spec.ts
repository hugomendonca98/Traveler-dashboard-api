import AppError from '@shared/errors/appError';
import FakeAddressRepository from '../repositories/fakes/FakeCityRepository';
import UpdateAddressService from './UpdateAddressService';

let fakeAddressRepository: FakeAddressRepository;
let updateAddresService: UpdateAddressService;

describe('UpdateAddress', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();
    updateAddresService = new UpdateAddressService(fakeAddressRepository);
  });

  // Deve ser capaz de atualizar um endereço.
  it('Should be able to update city.', async () => {
    const address = await fakeAddressRepository.create({
      zip_code: '12345678',
      street: 'street jon doe',
      neighborhood: 'neighborhood jon doe',
      number: null,
    });

    const addressUpdated = await updateAddresService.execute({
      id: address.id,
      zip_code: '87654321',
      street: 'street jon doe updated',
      neighborhood: 'neighborhood jon doe updated',
      number: 321,
    });

    expect(addressUpdated.id).toBe(address.id);
    expect(addressUpdated.zip_code).toBe('87654321');
    expect(addressUpdated.street).toBe('street jon doe updated');
    expect(addressUpdated.neighborhood).toBe('neighborhood jon doe updated');
    expect(addressUpdated.number).toBe(321);
  });

  // Não deve ser possível atualizar uma endereço com um id inexistente.
  it('Should not be possible to update a address with a non-existent id.', async () => {
    await expect(
      updateAddresService.execute({
        id: 'invalid id',
        zip_code: '87654321',
        street: 'street jon doe updated',
        neighborhood: 'neighborhood jon doe updated',
        number: 321,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
