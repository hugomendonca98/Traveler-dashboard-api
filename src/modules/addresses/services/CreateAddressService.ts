import AppError from '@shared/errors/appError';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import Address from '../infra/typeorm/entities/Address';
import IAddressRepository from '../repositories/IAddressRepository';

export default class CreateAddressService {
  constructor(private addressRepository: IAddressRepository) {}

  public async execute({
    zip_code,
    street,
    neighborhood,
    number,
  }: ICreateAddressDTO): Promise<Address> {
    const findEqualAddress = await this.addressRepository.findEqualAddress({
      zip_code,
      street,
      neighborhood,
      number,
    });

    if (findEqualAddress) {
      throw new AppError('Local address already exist.');
    }

    const address = await this.addressRepository.create({
      zip_code,
      street,
      neighborhood,
      number,
    });

    return address;
  }
}
