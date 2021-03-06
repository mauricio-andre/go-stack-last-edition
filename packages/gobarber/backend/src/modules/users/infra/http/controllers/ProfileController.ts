import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ userId });

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;
    const updateProfile = container.resolve(UpdateProfileService);
    const user = await updateProfile.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    });

    return response.json(classToClass(user));
  }
}
