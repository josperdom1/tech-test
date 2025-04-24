import { Type } from '../../domain/entities/Type';
import { TypeRepository } from '../../domain/repositories/TypeRepository';
import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';
import { TypeDto } from '../../infrastructure/http/dtos/TypeDto';
import { TypeMapper } from '../mappers/TypeMapper';

export class GetTypeQuery {
  constructor(private readonly typeRepository: TypeRepository) {}

  async execute(id: string): Promise<TypeDto> {
    const type = await this.typeRepository.findById(id);
    if (!type) {
      throw new NotFoundError(`Type with id ${id} not found`);
    }
    return TypeMapper.toDto(type);
  }
} 