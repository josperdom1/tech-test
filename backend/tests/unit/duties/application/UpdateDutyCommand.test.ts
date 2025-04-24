import { UpdateDutyCommand } from '../../../../src/duties/application/commands/UpdateDutyCommand';
import { DutyRepository } from '../../../../src/duties/domain/repositories/DutyRepository';
import { TypeRepository } from '../../../../src/types/domain/repositories/TypeRepository';
import { IDutyEventHandler } from '../../../../src/duties/application/event-handlers/DutyEventHandler';
import { Duty } from '../../../../src/duties/domain/entities/Duty';
import { Type } from '../../../../src/types/domain/entities/Type';
import { InvalidDutyError } from '../../../../src/shared/domain/errors/InvalidDutyError';
import { NotFoundError } from '../../../../src/shared/domain/errors/NotFoundError';

describe('UpdateDutyCommand', () => {
  let updateDutyCommand: UpdateDutyCommand;
  let mockDutyRepository: jest.Mocked<DutyRepository>;
  let mockTypeRepository: jest.Mocked<TypeRepository>;
  let mockDutyEventHandler: jest.Mocked<IDutyEventHandler>;
  let mockType: Type;
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

    mockTypeRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn()
    };

    mockDutyEventHandler = {
      handleDutyCreated: jest.fn(),
      handleDutyUpdated: jest.fn(),
      handleDutyDeleted: jest.fn()
    };

    mockType = new Type('1', 'Test Type');
    mockDuty = Duty.create('Original Duty', 'Original Description', mockType);

    mockTypeRepository.findById.mockResolvedValue(mockType);
    mockDutyRepository.findById.mockResolvedValue(mockDuty);

    updateDutyCommand = new UpdateDutyCommand(
      mockDutyRepository,
      mockTypeRepository,
      mockDutyEventHandler
    );
  });

  it('should update a duty successfully', async () => {
    const updateDutyDto = {
      name: 'Updated Duty',
      description: 'Updated Description',
      type: { id: '1', name: 'Test Type' },
      completed: true
    };

    await updateDutyCommand.execute(mockDuty.id, updateDutyDto);

    expect(mockTypeRepository.findById).toHaveBeenCalledWith('1');
    expect(mockDutyRepository.findById).toHaveBeenCalledWith(mockDuty.id);
    expect(mockDutyRepository.update).toHaveBeenCalled();
    expect(mockDutyEventHandler.handleDutyUpdated).toHaveBeenCalled();
  });

  it('should throw InvalidDutyError when type is not provided', async () => {
    const updateDutyDto = {
      name: 'Updated Duty',
      description: 'Updated Description',
      type: { id: '', name: '' },
      completed: true
    };

    await expect(updateDutyCommand.execute(mockDuty.id, updateDutyDto)).rejects.toThrow(InvalidDutyError);
  });

  it('should throw InvalidDutyError when type does not exist', async () => {
    const updateDutyDto = {
      name: 'Updated Duty',
      description: 'Updated Description',
      type: { id: '999', name: 'Non-existent Type' },
      completed: true
    };

    mockTypeRepository.findById.mockResolvedValue(null);

    await expect(updateDutyCommand.execute(mockDuty.id, updateDutyDto)).rejects.toThrow(InvalidDutyError);
  });

  it('should throw NotFoundError when duty does not exist', async () => {
    const updateDutyDto = {
      name: 'Updated Duty',
      description: 'Updated Description',
      type: { id: '1', name: 'Test Type' },
      completed: true
    };

    mockDutyRepository.findById.mockResolvedValue(null);

    await expect(updateDutyCommand.execute('non-existent-id', updateDutyDto)).rejects.toThrow(NotFoundError);
  });
}); 