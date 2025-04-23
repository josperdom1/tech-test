import { Duty } from '../../domain/entities/Duty';
import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { PaginatedDutiesDto } from '../../infrastructure/http/dtos/DutyDto';
import { DutyMapper } from '../mappers/DutyMapper';

export class GetPaginatedDutiesQuery {
  constructor(private readonly dutyRepository: DutyRepository) {}

  async execute(page: number = 1, limit: number = 10): Promise<PaginatedDutiesDto> {
    const { duties, total } = await this.dutyRepository.findAllPaginated(page, limit);
    return DutyMapper.toPaginatedDto(duties, total, page, limit);
  }
} 