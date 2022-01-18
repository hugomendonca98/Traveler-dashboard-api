import AppError from '@shared/errors/appError';
import IAddressRepository from '../repositories/IAddressRepository';

export default class DeleteAddressService {
  constructor(private addressRepository: IAddressRepository) {}

  public async execute(id: string): Promise<void> {
    const findAddress = await this.addressRepository.findById(id);

    if (!findAddress) {
      throw new AppError('the address does not exist.');
    }

    await this.addressRepository.delete(findAddress);
  }
}
