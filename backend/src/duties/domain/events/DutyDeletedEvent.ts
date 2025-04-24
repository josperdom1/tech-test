import { DomainEvent } from '../../../shared/domain/events/DomainEvent';

export class DutyDeletedEvent extends DomainEvent {
  constructor(public readonly dutyId: string) {
    super();
  }
} 