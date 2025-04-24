import { DomainEvent } from '../../../shared/domain/events/DomainEvent';
import { Duty } from '../entities/Duty';

export class DutyCreatedEvent extends DomainEvent {
  constructor(public readonly duty: Duty) {
    super();
  }
} 