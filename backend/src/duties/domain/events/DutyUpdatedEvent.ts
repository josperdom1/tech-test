import { DomainEvent } from '../../../shared/domain/events/DomainEvent';
import { Duty } from '../entities/Duty';

export class DutyUpdatedEvent extends DomainEvent {
  constructor(public readonly duty: Duty) {
    super();
  }
} 