import { Request, Response } from 'express';

import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import DeleteAddressService from '@modules/addresses/services/DeleteCityService';
import UpdateAddressService from '@modules/addresses/services/UpdateAddressService';
import ListAddressService from '@modules/addresses/services/ListAddressService';
import AddressRepository from '../../typeorm/repositories/AddressRepository';

export default class AddressController {
  public async Create(request: Request, response: Response): Promise<Response> {
    const { zip_code, street, neighborhood, number } = request.body;

    const addressRepositoy = new AddressRepository();
    const createAddressService = new CreateAddressService(addressRepositoy);

    const address = await createAddressService.execute({
      zip_code,
      street,
      neighborhood,
      number,
    });

    return response.json(address);
  }

  public async Delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const addressRepository = new AddressRepository();

    const deleteAddressService = new DeleteAddressService(addressRepository);

    await deleteAddressService.execute(id);

    return response.json({ message: 'Address deleted successfully.' });
  }

  public async Update(request: Request, response: Response): Promise<Response> {
    const { zip_code, street, neighborhood, number } = request.body;
    const { id } = request.params;

    const addressRepository = new AddressRepository();

    const updateAddresService = new UpdateAddressService(addressRepository);

    const address = await updateAddresService.execute({
      id,
      zip_code,
      street,
      neighborhood,
      number,
    });

    return response.json(address);
  }

  public async Index(_request: Request, response: Response): Promise<Response> {
    const addressRepository = new AddressRepository();

    const listAddressService = new ListAddressService(addressRepository);

    const addresses = await listAddressService.execute();

    return response.json(addresses);
  }
}
