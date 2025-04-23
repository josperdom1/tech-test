import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';

export class DeleteDutyCommand {
  constructor(private readonly dutyRepository: DutyRepository) {}

  async execute(id: string): Promise<void> {
    const existingDuty = await this.dutyRepository.findById(id);
    if (!existingDuty) {
      throw new NotFoundError(`Duty with id ${id} not found`);
    }

    await this.dutyRepository.delete(id);
  }
} 