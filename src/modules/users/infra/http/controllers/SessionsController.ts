import { Request, Response } from "express";

import BCryptHashProvider from "@modules/users/providers/hashProvider/implementations/BCryptHashProvider";
import SessionUserService from "@modules/users/services/SessionUserService";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";

export default class SessionController {
    public async Create(request: Request, response: Response): Promise<Response> {

        const { email, password } = request.body;

        const userRespository = new UserRepository();
        const bcryptHashProvider = new BCryptHashProvider();

        const sessionService = new SessionUserService(userRespository, bcryptHashProvider);

        const { user, token } = await sessionService.execute({ email, password });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        };

        return response.json({ userWithoutPassword, token });

    }
}