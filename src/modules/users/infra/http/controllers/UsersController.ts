import { Request, Response } from 'express';

import BCryptHashProvider from '@modules/users/providers/hashProvider/implementations/BCryptHashProvider';
import CreateUSerService from '@modules/users/services/CreateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

export default class UsersController {
    public async Create(request: Request, response: Response): Promise<Response> {

        const { name, email, password } = request.body;

        const userRepository = new UserRepository();
        const bcryptHashProivder = new BCryptHashProvider();

        const userService = new CreateUSerService(userRepository, bcryptHashProivder);

        const user = await userService.execute({ name, email, password });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        };

        return response.json(userWithoutPassword);
    }
}