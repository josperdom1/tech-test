import { v4 as uuidv4 } from 'uuid';

export enum DutyAction {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED'
}

export class DutyLog {
  constructor(
    public readonly id: string,
    public readonly dutyId: string,
    public readonly action: DutyAction,
    public readonly details: string,
    public readonly createdAt: Date
  ) {}

  static create(dutyId: string, action: DutyAction, details: string): DutyLog {
    return new DutyLog(
      uuidv4(),
      dutyId,
      action,
      details,
      new Date()
    );
  }
} 