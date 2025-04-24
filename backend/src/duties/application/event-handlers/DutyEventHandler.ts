import { DutyLogRepository } from '../../domain/repositories/DutyLogRepository';
import { DutyLog, DutyAction } from '../../domain/entities/DutyLog';
import { DutyCreatedEvent } from '../../domain/events/DutyCreatedEvent';
import { DutyUpdatedEvent } from '../../domain/events/DutyUpdatedEvent';
import { DutyDeletedEvent } from '../../domain/events/DutyDeletedEvent';

export interface IDutyEventHandler {
  handleDutyCreated(event: DutyCreatedEvent): Promise<void>;
  handleDutyUpdated(event: DutyUpdatedEvent): Promise<void>;
  handleDutyDeleted(event: DutyDeletedEvent): Promise<void>;
}

export class DutyEventHandler implements IDutyEventHandler {
  constructor(private readonly dutyLogRepository: DutyLogRepository) {}

  async handleDutyCreated(event: DutyCreatedEvent): Promise<void> {
    const log = DutyLog.create(
      event.duty.id,
      DutyAction.CREATED,
      `Duty "${event.duty.name}" was created`
    );
    await this.dutyLogRepository.save(log);
  }

  async handleDutyUpdated(event: DutyUpdatedEvent): Promise<void> {
    const log = DutyLog.create(
      event.duty.id,
      DutyAction.UPDATED,
      `Duty "${event.duty.name}" was updated`
    );
    await this.dutyLogRepository.save(log);
  }

  async handleDutyDeleted(event: DutyDeletedEvent): Promise<void> {
    const log = DutyLog.create(
      event.dutyId,
      DutyAction.DELETED,
      `Duty with ID "${event.dutyId}" was deleted`
    );
    await this.dutyLogRepository.save(log);
  }
} 