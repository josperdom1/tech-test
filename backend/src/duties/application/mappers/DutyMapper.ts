import { Duty } from '../../domain/entities/Duty';
import { Type } from '../../../types/domain/entities/Type';
import { DutyDto, CreateDutyDto, UpdateDutyDto, PaginatedDutiesDto } from '../../infrastructure/http/dtos/DutyDto';
import { TypeMapper } from '../../../types/application/mappers/TypeMapper';

export class DutyMapper {
  static toDto(duty: Duty): DutyDto {
    return {
      id: duty.id,
      name: duty.name,
      description: duty.description,
      completed: duty.completed,
      createdAt: duty.createdAt,
      updatedAt: duty.updatedAt,
      type: TypeMapper.toDto(duty.type)
    };
  }

  static toDomain(dto: CreateDutyDto | UpdateDutyDto): { name: string; description: string; type: Type } {
    return {
      name: dto.name,
      description: dto.description,
      type: new Type(dto.type.id, dto.type.name)
    };
  }

  static toPaginatedDto(duties: Duty[], total: number, page: number, limit: number): PaginatedDutiesDto {
    return {
      duties: duties.map(duty => this.toDto(duty)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }
} 