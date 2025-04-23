import { Duty } from '../../domain/entities/Duty';
import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { Type } from '../../../types/domain/entities/Type';
import { CreateDutyDto, DutyDto } from '../../infrastructure/http/dtos/DutyDto';
import { DutyMapper } from '../mappers/DutyMapper';

export class CreateDutyCommand {
  constructor(private readonly dutyRepository: DutyRepository) {}

  async execute(createDutyDto: CreateDutyDto): Promise<DutyDto> {
    const { name, description, type } = DutyMapper.toDomain(createDutyDto);
    const duty = Duty.create(name, description, type);
    await this.dutyRepository.save(duty);
    return DutyMapper.toDto(duty);
  }
} 