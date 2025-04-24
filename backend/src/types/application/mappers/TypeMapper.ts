import { Type } from '../../domain/entities/Type';
import { TypeDto, CreateTypeDto, UpdateTypeDto } from '../../infrastructure/http/dtos/TypeDto';

export class TypeMapper {
  static toDto(type: Type): TypeDto {
    return {
      id: type.id,
      name: type.name
    };
  }

  static toDomain(dto: CreateTypeDto | UpdateTypeDto): { name: string } {
    return {
      name: dto.name
    };
  }
} 