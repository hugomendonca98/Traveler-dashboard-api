import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import BCryptHashProvider from '@modules/users/providers/hashProvider/implementations/BCryptHashProvider';
import CreateUSerService from '@modules/users/services/CreateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

export default class UsersController {
  public async Create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const bcryptHashProivder = new BCryptHashProvider();

    const userService = new CreateUSerService(
      userRepository,
      bcryptHashProivder,
    );

    const user = await userService.execute({ name, email, password });

    return response.json(instanceToInstance(user));
  }
}
