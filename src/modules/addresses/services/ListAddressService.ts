import Address from '../infra/typeorm/entities/Address';
import IAddressRepository from '../repositories/IAddressRepository';

export default class ListAddressService {
  constructor(private addressRepository: IAddressRepository) {}

  public async execute(): Promise<Address[]> {
    const address = await this.addressRepository.findAll();

    return address;
  }
}
