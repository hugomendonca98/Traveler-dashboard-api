import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import IFindEqualAddressDTO from '@modules/addresses/dtos/IFindEqualAddressDTO';
import IAdressRepository from '@modules/addresses/repositories/IAddressRepository';
import { getRepository, Repository } from 'typeorm';
import Address from '../entities/Address';

export default class AddressRepository implements IAdressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create({
    zip_code,
    street,
    neighborhood,
    number,
  }: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      zip_code,
      street,
      neighborhood,
      number,
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async findAll(): Promise<Address[]> {
    const addresses = await this.ormRepository.find();

    return addresses;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { id },
    });

    return address;
  }

  public async findEqualAddress({
    zip_code,
    street,
    neighborhood,
    number,
  }: IFindEqualAddressDTO): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { zip_code, street, neighborhood, number },
    });

    return address;
  }

  public async delete(address: Address): Promise<void> {
    await this.ormRepository.remove(address);
  }

  public async save(address: Address): Promise<Address> {
    const addressSaved = await this.ormRepository.save(address);

    return addressSaved;
  }
}
