import { Duty } from '../../domain/entities/Duty';
import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';
import { DutyDto } from '../../infrastructure/http/dtos/DutyDto';
import { DutyMapper } from '../mappers/DutyMapper';

export class GetDutyQuery {
  constructor(private readonly dutyRepository: DutyRepository) {}

  async execute(id: string): Promise<DutyDto> {
    const duty = await this.dutyRepository.findById(id);
    if (!duty) {
      throw new NotFoundError(`Duty with id ${id} not found`);
    }
    return DutyMapper.toDto(duty);
  }
} 