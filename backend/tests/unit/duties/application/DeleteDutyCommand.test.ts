import { DeleteDutyCommand } from '../../../../src/duties/application/commands/DeleteDutyCommand';
import { DutyRepository } from '../../../../src/duties/domain/repositories/DutyRepository';
import { IDutyEventHandler } from '../../../../src/duties/application/event-handlers/DutyEventHandler';
import { Duty } from '../../../../src/duties/domain/entities/Duty';
import { Type } from '../../../../src/types/domain/entities/Type';
import { NotFoundError } from '../../../../src/shared/domain/errors/NotFoundError';

describe('DeleteDutyCommand', () => {
  let deleteDutyCommand: DeleteDutyCommand;
  let mockDutyRepository: jest.Mocked<DutyRepository>;
  let mockDutyEventHandler: jest.Mocked<IDutyEventHandler>;
  let mockDuty: Duty;

  beforeEach(() => {
    mockDutyRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findAllPaginated: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };

    mockDutyEventHandler = {
      handleDutyCreated: jest.fn(),
      handleDutyUpdated: jest.fn(),
      handleDutyDeleted: jest.fn()
    };

    const mockType = new Type('1', 'Test Type');
    mockDuty = Duty.create('Test Duty', 'Test Description', mockType);

    mockDutyRepository.findById.mockResolvedValue(mockDuty);

    deleteDutyCommand = new DeleteDutyCommand(
      mockDutyRepository,
      mockDutyEventHandler
    );
  });

  it('should mark a duty as deleted successfully', async () => {
    await deleteDutyCommand.execute(mockDuty.id);

    expect(mockDutyRepository.findById).toHaveBeenCalledWith(mockDuty.id);
    expect(mockDutyRepository.update).toHaveBeenCalledWith(expect.objectContaining({
      id: mockDuty.id,
      deleted: true
    }));
    expect(mockDutyEventHandler.handleDutyDeleted).toHaveBeenCalled();
  });

  it('should throw NotFoundError when duty does not exist', async () => {
    mockDutyRepository.findById.mockResolvedValue(null);

    await expect(deleteDutyCommand.execute('non-existent-id')).rejects.toThrow(NotFoundError);
  });
}); 