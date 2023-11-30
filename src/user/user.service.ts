import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async paginate(page = 1, options = {}): Promise<any> {
    const { data, meta } = await super.paginate(page, options);

    return {
      data: data.map((user) => {
        const { password, ...data } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
        return data;
      }),
      meta,
    };
  }
}
