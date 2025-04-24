import { DutyRepository } from '../../domain/repositories/DutyRepository';
import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';
import { DutyDeletedEvent } from '../../domain/events/DutyDeletedEvent';
import { IDutyEventHandler } from '../event-handlers/DutyEventHandler';

export class DeleteDutyCommand {
  constructor(
    private readonly dutyRepository: DutyRepository,
    private readonly dutyEventHandler: IDutyEventHandler
  ) {}

  async execute(id: string): Promise<void> {
    const existingDuty = await this.dutyRepository.findById(id);
    if (!existingDuty) {
      throw new NotFoundError(`Duty with id ${id} not found`);
    }

    // Mark the duty as deleted
    existingDuty.markAsDeleted();
    
    // Save the updated duty
    await this.dutyRepository.update(existingDuty);
    
    // Emit event for logging
    await this.dutyEventHandler.handleDutyDeleted(new DutyDeletedEvent(id));
  }
} 