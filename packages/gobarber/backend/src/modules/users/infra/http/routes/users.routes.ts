import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService';
import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import UsersRepository from '../../typeorm/repositories/UserRepository';

interface IUserResponse extends Omit<User, 'password'> {
  password?: string;
}

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = container.resolve(CreateUserService);
  const user = await createUser.execute({ name, email, password });
  const userResponse = { ...user } as IUserResponse;

  delete userResponse.password;

  return response.json(userResponse);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);
    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename,
    });

    const userResponse = { ...user } as IUserResponse;

    delete userResponse.password;

    return response.json(userResponse);
  },
);

export default usersRouter;
