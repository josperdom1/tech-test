import { DutyEventHandler } from '../../../../src/duties/application/event-handlers/DutyEventHandler';
import { DutyLogRepository } from '../../../../src/duties/domain/repositories/DutyLogRepository';
import { DutyCreatedEvent } from '../../../../src/duties/domain/events/DutyCreatedEvent';
import { DutyUpdatedEvent } from '../../../../src/duties/domain/events/DutyUpdatedEvent';
import { DutyDeletedEvent } from '../../../../src/duties/domain/events/DutyDeletedEvent';
import { Duty } from '../../../../src/duties/domain/entities/Duty';
import { Type } from '../../../../src/types/domain/entities/Type';
import { DutyAction } from '../../../../src/duties/domain/entities/DutyLog';

describe('DutyEventHandler', () => {
  let dutyEventHandler: DutyEventHandler;
  let mockDutyLogRepository: jest.Mocked<DutyLogRepository>;
  let mockDuty: Duty;

  beforeEach(() => {
    mockDutyLogRepository = {
      save: jest.fn(),
      findByDutyId: jest.fn(),
      findAll: jest.fn()
    };

    const mockType = new Type('1', 'Test Type');
    mockDuty = Duty.create('Test Duty', 'Test Description', mockType);

    dutyEventHandler = new DutyEventHandler(mockDutyLogRepository);
  });

  it('should handle duty created event', async () => {
    const event = new DutyCreatedEvent(mockDuty);
    await dutyEventHandler.handleDutyCreated(event);

    expect(mockDutyLogRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        dutyId: mockDuty.id,
        action: DutyAction.CREATED,
        details: `Duty "${mockDuty.name}" was created`
      })
    );
  });

  it('should handle duty updated event', async () => {
    const event = new DutyUpdatedEvent(mockDuty);
    await dutyEventHandler.handleDutyUpdated(event);

    expect(mockDutyLogRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        dutyId: mockDuty.id,
        action: DutyAction.UPDATED,
        details: `Duty "${mockDuty.name}" was updated`
      })
    );
  });

  it('should handle duty deleted event', async () => {
    const event = new DutyDeletedEvent(mockDuty.id);
    await dutyEventHandler.handleDutyDeleted(event);

    expect(mockDutyLogRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        dutyId: mockDuty.id,
        action: DutyAction.DELETED,
        details: `Duty with ID "${mockDuty.id}" was deleted`
      })
    );
  });
}); 