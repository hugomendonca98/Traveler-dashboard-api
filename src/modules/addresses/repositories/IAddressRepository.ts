import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import IFindEqualAddress from '../dtos/IFindEqualAddressDTO';
import Address from '../infra/typeorm/entities/Address';

export default interface IAddressRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  findById(id: string): Promise<Address | undefined>;
  findEqualAddress(data: IFindEqualAddress): Promise<Address | undefined>;
  findAll(): Promise<Address[]>;
  delete(address: Address): Promise<void>;
  save(address: Address): Promise<Address>;
}
