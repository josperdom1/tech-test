import { Type } from '../../domain/entities/Type';
import { TypeRepository } from '../../domain/repositories/TypeRepository';
import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';
import { InvalidDutyError } from '../../../shared/domain/errors/InvalidDutyError';
import { UpdateTypeDto, TypeDto } from '../../infrastructure/http/dtos/TypeDto';
import { TypeMapper } from '../mappers/TypeMapper';

export class UpdateTypeCommand {
  constructor(private readonly typeRepository: TypeRepository) {}

  async execute(id: string, updateTypeDto: UpdateTypeDto): Promise<TypeDto> {
    if (!updateTypeDto.name) {
      throw new InvalidDutyError('Name is required for updating a type');
    }

    const existingType = await this.typeRepository.findById(id);
    if (!existingType) {
      throw new NotFoundError(`Type with id ${id} not found`);
    }

    const { name } = TypeMapper.toDomain(updateTypeDto);
    const updatedType = new Type(id, name);
    await this.typeRepository.update(updatedType);
    return TypeMapper.toDto(updatedType);
  }
} 