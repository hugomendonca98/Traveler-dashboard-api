import AppError from '@shared/errors/appError';
import FakeAddressRepository from '../repositories/fakes/FakeCityRepository';
import CreateAddressService from './CreateAddressService';

let fakeAddressRepository: FakeAddressRepository;
let createAddressService: CreateAddressService;

describe('CreateAddress', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();
    createAddressService = new CreateAddressService(fakeAddressRepository);
  });

  // Deve ser capaz de criar um novo endereço.
  it('Should be able to create new address.', async () => {
    const address = await createAddressService.execute({
      zip_code: '12345678',
      street: 'street jon doe',
      neighborhood: 'neighborhood jon doe',
      number: 123,
    });

    expect(address).toHaveProperty('id');
  });

  // Não deve ser possível criar uma novo endereço indentico a outro.
  it('Should not be able to create a new address with same equal another.', async () => {
    await createAddressService.execute({
      zip_code: '12345678',
      street: 'street jon doe',
      neighborhood: 'neighborhood jon doe',
      number: 123,
    });

    await expect(
      createAddressService.execute({
        zip_code: '12345678',
        street: 'street jon doe',
        neighborhood: 'neighborhood jon doe',
        number: 123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
