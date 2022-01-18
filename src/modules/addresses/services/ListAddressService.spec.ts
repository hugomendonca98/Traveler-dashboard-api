import FakeAddressRepository from '../repositories/fakes/FakeCityRepository';
import ListAddressService from './ListAddressService';

let fakeAddressRepository: FakeAddressRepository;
let listAddressService: ListAddressService;

describe('ListAddresses', () => {
  beforeEach(() => {
    fakeAddressRepository = new FakeAddressRepository();
    listAddressService = new ListAddressService(fakeAddressRepository);
  });

  // Deve listar todas os endereços cadastrados.
  it('Should be able to list all cities.', async () => {
    const address = await fakeAddressRepository.create({
      zip_code: '12345678',
      street: 'street jon doe',
      neighborhood: 'neighborhood jon doe',
      number: 123,
    });

    const address2 = await fakeAddressRepository.create({
      zip_code: '12345678',
      street: 'street jon doe 2',
      neighborhood: 'neighborhood jon doe 2',
      number: 1234,
    });

    const allAddress = await listAddressService.execute();

    expect(allAddress).toStrictEqual([address, address2]);
  });
});
