import { getRepository, Not, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';
import IFindAllProvidersDto from '@modules/users/dtos/IFindAllProvidersDto';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    exceptUserId,
  }: IFindAllProvidersDto): Promise<User[]> {
    if (exceptUserId) {
      const users = await this.ormRepository.find({
        where: {
          id: Not(exceptUserId),
        },
      });

      return users;
    }

    const users = await this.ormRepository.find();
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDto): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    return this.ormRepository.save(user);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
