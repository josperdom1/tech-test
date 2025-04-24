import { GetDutyQuery } from '../../../../src/duties/application/queries/GetDutyQuery';
import { DutyRepository } from '../../../../src/duties/domain/repositories/DutyRepository';
import { Duty } from '../../../../src/duties/domain/entities/Duty';
import { Type } from '../../../../src/types/domain/entities/Type';
import { NotFoundError } from '../../../../src/shared/domain/errors/NotFoundError';

describe('GetDutyQuery', () => {
  let getDutyQuery: GetDutyQuery;
  let mockDutyRepository: jest.Mocked<DutyRepository>;
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

    const mockType = new Type('1', 'Test Type');
    mockDuty = Duty.create('Test Duty', 'Test Description', mockType);

    mockDutyRepository.findById.mockResolvedValue(mockDuty);

    getDutyQuery = new GetDutyQuery(mockDutyRepository);
  });

  it('should return a duty when it exists', async () => {
    const result = await getDutyQuery.execute(mockDuty.id);

    expect(mockDutyRepository.findById).toHaveBeenCalledWith(mockDuty.id);
    expect(result).toEqual({
      id: mockDuty.id,
      name: mockDuty.name,
      description: mockDuty.description,
      completed: mockDuty.completed,
      createdAt: mockDuty.createdAt,
      updatedAt: mockDuty.updatedAt,
      type: {
        id: mockDuty.type.id,
        name: mockDuty.type.name
      }
    });
  });

  it('should throw NotFoundError when duty does not exist', async () => {
    mockDutyRepository.findById.mockResolvedValue(null);

    await expect(getDutyQuery.execute('non-existent-id')).rejects.toThrow(NotFoundError);
  });
}); 