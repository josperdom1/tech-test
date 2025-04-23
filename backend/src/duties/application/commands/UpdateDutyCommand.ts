import { Duty } from '../../domain/entities/Duty';
import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { Type } from '../../../types/domain/entities/Type';
import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';
import { UpdateDutyDto, DutyDto } from '../../infrastructure/http/dtos/DutyDto';
import { DutyMapper } from '../mappers/DutyMapper';

export class UpdateDutyCommand {
  constructor(private readonly dutyRepository: DutyRepository) {}

  async execute(id: string, updateDutyDto: UpdateDutyDto): Promise<DutyDto> {
    const existingDuty = await this.dutyRepository.findById(id);
    if (!existingDuty) {
      throw new NotFoundError(`Duty with id ${id} not found`);
    }

    const { name, description, type } = DutyMapper.toDomain(updateDutyDto);
    const updatedDuty = new Duty(
      id,
      name,
      description,
      updateDutyDto.completed ?? existingDuty.completed,
      existingDuty.createdAt,
      new Date(),
      type
    );

    await this.dutyRepository.update(updatedDuty);
    return DutyMapper.toDto(updatedDuty);
  }
} 