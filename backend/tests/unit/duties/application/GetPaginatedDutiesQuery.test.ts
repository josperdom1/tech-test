import { GetPaginatedDutiesQuery } from '../../../../src/duties/application/queries/GetPaginatedDutiesQuery';
import { DutyRepository } from '../../../../src/duties/domain/repositories/DutyRepository';
import { Duty } from '../../../../src/duties/domain/entities/Duty';
import { Type } from '../../../../src/types/domain/entities/Type';

describe('GetPaginatedDutiesQuery', () => {
  let getPaginatedDutiesQuery: GetPaginatedDutiesQuery;
  let mockDutyRepository: jest.Mocked<DutyRepository>;
  let mockDuties: Duty[];

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
    mockDuties = [
      Duty.create('Duty 1', 'Description 1', mockType),
      Duty.create('Duty 2', 'Description 2', mockType)
    ];

    mockDutyRepository.findAllPaginated.mockResolvedValue({
      duties: mockDuties,
      total: 2
    });

    getPaginatedDutiesQuery = new GetPaginatedDutiesQuery(mockDutyRepository);
  });

  it('should return paginated duties with default values', async () => {
    const result = await getPaginatedDutiesQuery.execute();

    expect(mockDutyRepository.findAllPaginated).toHaveBeenCalledWith(1, 10);
    expect(result).toEqual({
      duties: mockDuties.map(duty => ({
        id: duty.id,
        name: duty.name,
        description: duty.description,
        completed: duty.completed,
        createdAt: duty.createdAt,
        updatedAt: duty.updatedAt,
        type: {
          id: duty.type.id,
          name: duty.type.name
        }
      })),
      total: 2,
      page: 1,
      limit: 10,
      totalPages: 1
    });
  });

  it('should return paginated duties with custom values', async () => {
    const result = await getPaginatedDutiesQuery.execute(2, 5);

    expect(mockDutyRepository.findAllPaginated).toHaveBeenCalledWith(2, 5);
    expect(result).toEqual({
      duties: mockDuties.map(duty => ({
        id: duty.id,
        name: duty.name,
        description: duty.description,
        completed: duty.completed,
        createdAt: duty.createdAt,
        updatedAt: duty.updatedAt,
        type: {
          id: duty.type.id,
          name: duty.type.name
        }
      })),
      total: 2,
      page: 2,
      limit: 5,
      totalPages: 1
    });
  });
}); 