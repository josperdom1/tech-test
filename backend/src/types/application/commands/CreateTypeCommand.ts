import { Type } from '../../domain/entities/Type';
import { TypeRepository } from '../../domain/repositories/TypeRepository';
import { CreateTypeDto, TypeDto } from '../../infrastructure/http/dtos/TypeDto';
import { TypeMapper } from '../mappers/TypeMapper';
import { InvalidDutyError } from '../../../shared/domain/errors/InvalidDutyError';

export class CreateTypeCommand {
  constructor(private readonly typeRepository: TypeRepository) {}

  async execute(createTypeDto: CreateTypeDto): Promise<TypeDto> {
    if (!createTypeDto.name) {
      throw new InvalidDutyError('Name is required for creating a type');
    }

    const { name } = TypeMapper.toDomain(createTypeDto);
    const type = Type.create(name);
    await this.typeRepository.save(type);
    return TypeMapper.toDto(type);
  }
} 