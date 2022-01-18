import AppError from '@shared/errors/appError';
import IUpdateCityServiceDTO from '../dtos/IUpdateAddressDTO';
import City from '../infra/typeorm/entities/Address';
import IAddressRepository from '../repositories/IAddressRepository';

export default class UpdateAddressService {
  constructor(private addressRepository: IAddressRepository) {}

  public async execute({
    id,
    zip_code,
    street,
    neighborhood,
    number,
  }: IUpdateCityServiceDTO): Promise<City> {
    const findAddress = await this.addressRepository.findById(id);

    if (!findAddress) {
      throw new AppError('The address does not exist.');
    }

    Object.assign(findAddress, { zip_code, street, neighborhood, number });

    const address = await this.addressRepository.save(findAddress);

    return address;
  }
}
