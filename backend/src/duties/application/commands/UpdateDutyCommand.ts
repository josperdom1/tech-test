import { Duty } from '../../domain/entities/Duty';
import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { Type } from '../../../types/domain/entities/Type';
import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';

export class UpdateDutyCommand {
  constructor(private readonly dutyRepository: DutyRepository) {}

  async execute(id: string, name: string, type: Type, completed?: boolean): Promise<Duty> {
    const existingDuty = await this.dutyRepository.findById(id);
    if (!existingDuty) {
      throw new NotFoundError(`Duty with id ${id} not found`);
    }

    const updatedDuty = new Duty(
      id,
      name,
      completed ?? existingDuty.completed,
      existingDuty.createdAt,
      new Date(),
      type
    );

    await this.dutyRepository.update(updatedDuty);
    return updatedDuty;
  }
} 