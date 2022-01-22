import { v4 as uuid } from 'uuid';

import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import Address from '@modules/addresses/infra/typeorm/entities/Address';
import IFindEqualAddressDTO from '@modules/addresses/dtos/IFindEqualAddressDTO';
import IAddressRepository from '../IAddressRepository';

export default class FakeAddressRepository implements IAddressRepository {
  private addresses: Address[] = [];

  public async create(data: ICreateAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, { id: uuid() }, data);

    this.addresses.push(address);

    return address;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = this.addresses.find(findAddress => findAddress.id === id);

    return address;
  }

  public async findEqualAddress({
    zip_code,
    street,
    neighborhood,
    number,
  }: IFindEqualAddressDTO): Promise<Address | undefined> {
    const address = this.addresses.find(
      findAddress =>
        findAddress.zip_code === zip_code &&
        findAddress.street === street &&
        findAddress.neighborhood === neighborhood &&
        findAddress.number === number,
    );

    return address;
  }

  public async findAll(): Promise<Address[]> {
    return this.addresses;
  }

  public async delete(address: Address): Promise<void> {
    const addressIndex = this.addresses.findIndex(
      findAddress => findAddress.id === address.id,
    );

    this.addresses.splice(addressIndex, 1);
  }

  public async save(address: Address): Promise<Address> {
    const findIndex = this.addresses.findIndex(
      findAddress => findAddress.id === address.id,
    );

    this.addresses[findIndex] = address;

    return address;
  }
}
