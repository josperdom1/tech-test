import { Type } from '../../domain/entities/Type';
import { TypeRepository } from '../../domain/repositories/TypeRepository';
import { TypeDto } from '../../infrastructure/http/dtos/TypeDto';
import { TypeMapper } from '../mappers/TypeMapper';

export class GetAllTypesQuery {
  constructor(private readonly typeRepository: TypeRepository) {}

  async execute(): Promise<TypeDto[]> {
    const types = await this.typeRepository.findAll();
    return types.map(type => TypeMapper.toDto(type));
  }
} 