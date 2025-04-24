import { CreateDutyCommand } from '../../../../src/duties/application/commands/CreateDutyCommand';
import { DutyRepository } from '../../../../src/duties/domain/repositories/DutyRepository';
import { TypeRepository } from '../../../../src/types/domain/repositories/TypeRepository';
import { IDutyEventHandler } from '../../../../src/duties/application/event-handlers/DutyEventHandler';
import { Duty } from '../../../../src/duties/domain/entities/Duty';
import { Type } from '../../../../src/types/domain/entities/Type';
import { InvalidDutyError } from '../../../../src/shared/domain/errors/InvalidDutyError';

describe('CreateDutyCommand', () => {
  let createDutyCommand: CreateDutyCommand;
  let mockDutyRepository: jest.Mocked<DutyRepository>;
  let mockTypeRepository: jest.Mocked<TypeRepository>;
  let mockDutyEventHandler: jest.Mocked<IDutyEventHandler>;
  let mockType: Type;

  beforeEach(() => {
    // Mock repositories
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

    // Mock event handler
    mockDutyEventHandler = {
      handleDutyCreated: jest.fn(),
      handleDutyUpdated: jest.fn(),
      handleDutyDeleted: jest.fn()
    };

    // Create test data
    mockType = new Type('1', 'Test Type');
    mockTypeRepository.findById.mockResolvedValue(mockType);

    // Create command instance
    createDutyCommand = new CreateDutyCommand(
      mockDutyRepository,
      mockTypeRepository,
      mockDutyEventHandler
    );
  });

  it('should create a duty successfully', async () => {
    // Arrange
    const createDutyDto = {
      name: 'Test Duty',
      description: 'Test Description',
      type: { id: '1', name: 'Test Type' }
    };

    // Act
    await createDutyCommand.execute(createDutyDto);

    // Assert
    expect(mockTypeRepository.findById).toHaveBeenCalledWith('1');
    expect(mockDutyRepository.save).toHaveBeenCalled();
    expect(mockDutyEventHandler.handleDutyCreated).toHaveBeenCalled();
  });

  it('should throw InvalidDutyError when type is not provided', async () => {
    // Arrange
    const createDutyDto = {
      name: 'Test Duty',
      description: 'Test Description',
      type: { id: '', name: '' }
    };

    // Act & Assert
    await expect(createDutyCommand.execute(createDutyDto)).rejects.toThrow(InvalidDutyError);
  });
}); 