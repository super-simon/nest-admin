import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated-result.interface';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async all(options = {}): Promise<any[]> {
    return this.repository.find(options);
  }

  async paginate(page = 1, options = {}): Promise<PaginatedResult> {
    const take = 10;
    const [data, total] = await this.repository.findAndCount({
      ...options,
      skip: (page - 1) * take,
      take,
    });
    return {
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(data): Promise<any> {
    return this.repository.save(data);
  }

  async findOne(condition): Promise<any> {
    return this.repository.findOne(condition);
  }
  async update(id: number, data): Promise<any> {
    return this.repository.update(id, data);
  }
  async delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
