import { DutyLog, DutyAction } from '../../../../src/duties/domain/entities/DutyLog';

describe('DutyLog', () => {
  it('should create a duty log with correct initial values', () => {
    const dutyId = '123';
    const action = DutyAction.CREATED;
    const details = 'Test log details';
    
    const log = DutyLog.create(dutyId, action, details);
    
    expect(log.dutyId).toBe(dutyId);
    expect(log.action).toBe(action);
    expect(log.details).toBe(details);
    expect(log.id).toBeDefined();
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it('should create logs for different actions', () => {
    const dutyId = '123';
    
    const createdLog = DutyLog.create(dutyId, DutyAction.CREATED, 'Created log');
    const updatedLog = DutyLog.create(dutyId, DutyAction.UPDATED, 'Updated log');
    const deletedLog = DutyLog.create(dutyId, DutyAction.DELETED, 'Deleted log');
    
    expect(createdLog.action).toBe(DutyAction.CREATED);
    expect(updatedLog.action).toBe(DutyAction.UPDATED);
    expect(deletedLog.action).toBe(DutyAction.DELETED);
  });
}); 